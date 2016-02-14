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

function * getConsulKv() {
  const keys = yield getConsulBaseKeys()
  const kvArray = yield keys.map(getConsulKvByKey)
  let consulKv = {}
  kvArray.map((kv) => {
    _.extend(consulKv, kv)
  })
  return consulKv
}

module.exports = {
  * get(params) {
    consulKv = yield getConsulKv()
    return consulKv
  },

  * getFeatures(params) {
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
}
