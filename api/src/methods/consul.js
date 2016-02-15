const _ = require('underscore'),
  consul = require('consul')()

function parse_data(kv) {
  var cfg = {}
  _.each(kv, function(item) {
    var prev, current = cfg
    var parts = item['Key'].split('/')
    var i = 0
    while (i < parts.length - 1) {
      var p = parts[i]
      if (!_.has(current, p)) {
        if ((i + 1) < parts.length
          && !isNaN(parts[i + 1])) {
            current[p] = []
        } else {
          current[p] = {}
        }
      }
      current = current[p]
      i = i + 1
    }
    if(parts[i].length > 0) {
      current[parts[i]] = item['Value']
    }
  })
  return cfg
}

function deepExtend(destination , sources){
  _.each(sources , function(value, key, list){
    if(!key) return
    if (_.has(destination , key) && _.isObject(value)){
        deepExtend(destination[key] , value)
      }else{
      destination[key] = value
    }
  })
  return destination
}

function get_kv(base_key, callback) {
  consul.kv.get({
    key: base_key,
    recurse: true
  }, function(err, kv) {
    if (err) return callback(err)
    if (!kv || kv.length == 0) return callback(new Error('no kv found for ' + base_key))
    const cfg = parse_data(kv)[base_key.substring(0,base_key.length - 1)]
    callback(null, cfg)
  })
}

function setConsulKeyValue(kv) {
  return function(callback) {
    consul.kv.set(kv.key, kv.value, callback)
  }
}

function deleteConsulKeyValue(key, recurse) {
  return function(callback) {
    console.log('delete consul kv', key)
    consul.kv.del({
      key: `${key}/`,
      recurse: recurse
    }, function(err) {
      if (err) {
        return callback(err, false)
      }
      callback(null, true)
    })
  }
}

function getConsulKvByKey(key) {
  // console.log('getConsulKvByKey:', key)
  return function(callback) {
    let kv = {}
    get_kv(key, function(err, result) {
      kv[key] = result
      callback(err, kv)
    })
  }
}

function getConsulBaseKeys() {
  return function(callback) {
    consul.kv.keys('api:', function(err, result) {
      let keys = []
      result.forEach(key => {
        const s = key.split('/')
        let base_key = `${_.first(s)}/`
        if (keys.indexOf(base_key) < 0) {
          keys.push(base_key)
        }
      })
      // console.log('base_key:', keys)
      callback(err, keys)
    })
  }
}

function * setConsulKv(kv) {
  const result = yield setConsulKeyValue(kv)
  return {
    kv: kv,
    success: _.first(result)
  }
}

function * deleteConsulKey(key, recurse=false) {
  return yield deleteConsulKeyValue(key, recurse)
}

function * getConsulKv() {
  const keys = yield getConsulBaseKeys()
  const kvArray = yield keys.map(getConsulKvByKey)
  let consulKv = {}
  kvArray.map((kv) => {
    _.extend(consulKv, kv)
  })
  return consulKv
}

function * getFeatures() {
  const consulKv = yield getConsulKv()
  const featuresArray = []
  Object.keys(consulKv)
    .map((key) => {
      const kv = consulKv[key]
      if (kv.features) {
        const service = key.replace('api:', '')
          .replace('/', '')
        Object.keys(kv.features)
          .map((k) => {
            const feature = kv.features[k]
            const a = {
              id: `${service}:${k}`,
              key: k,
              service: service,
              data: feature
            }
            featuresArray.push(a)
          })
      }
    })
  return featuresArray
}

module.exports = {
  * get(params) {
    consulKv = yield getConsulKv()
    return consulKv
  },

  * getFeatures() {
    return yield getFeatures()
  },

  * getFeature(id) {
    const features = yield getFeatures()
    let feature = null
    features.map((f) => {
      if (f.id === id) {
        feature = f
      }
    })
    return feature
  },

  * deleteFeature(id) {
    const c = id.split(':')
    const base = `api:${c[0]}/features`
    const key = `${base}/${c[1]}`
    return yield deleteConsulKey(key, true)
  },

  * createFeature(feature) {
    const base = `api:${feature.service}/features`
    const key = `${base}/${feature.key}`
    const kv = []
    const extract = (obj, objKey) => {
      const key = typeof objKey === 'string' ? objKey : ''
      // console.log('extract kv', key, obj, Object.keys(obj))
      const attrs = Object.keys(obj)
      // console.log('attrs', attrs)
      attrs.map((k) => {
        const type = typeof obj[k]
        const attrKey = `${key}/${k}`
        // console.log('typeof', attrKey, obj[k], type)
        if (type === 'object' || type === 'array') {
          return extract(obj[k], attrKey, kv)
        } else {
          const attrKv = {
            key: attrKey,
            value: `${obj[k]}`
          }
          // console.log('attrKv', attrKv)
          kv.push(attrKv)
        }
      })
    }
    console.log('createFeature', key, feature)
    extract(feature.data, key)
    // console.log('kv', kv)
    const results = yield kv.map(setConsulKv)
    console.log('set kv results', results)
    const failures = []
    results.map(res => {
      if (!res.success) {
        failures.push(res)
      }
    })
    if (!_.isEmpty(failures)) {
      yield deleteConsulKey(key, true)
      console.error('rollback consul set kv', failures)
      return false
    }
    return true
  }
}
