const _ = require('underscore')
const consul = require('../methods/consul')


module.exports = {
  * get() {
    const featuresArray = yield consul.getFeatures()
    this.body = featuresArray
  },

  * post() {
    const newFeature = this.request.body
    const success = yield consul.createFeature(newFeature)
    if (success) {
      this.body = newFeature
    } else {
      this.status = 500
      this.message = 'Create feature failed'
    }
  },

  * put() {
    const id = this.params.id
    const updatedFeature = this.request.body
    const feature = yield consul.getFeature(id)
    console.log('feature', id, feature)
    if (feature) {
      const deleted = yield consul.deleteFeature(id)
      console.log('delete old feature', id, deleted)
      if (deleted) {
        console.log('set updated feature', updatedFeature)
        const success = yield consul.createFeature(updatedFeature)
        if (success) {
          this.body = 'ok'
        } else {
          this.status = 500
          this.message = 'Update feature failed'
        }
      } else {
        this.status = 500
        this.message = 'Failed to remove old feature'
      }
    } else {
      this.status = 404
      this.message = 'Feature not found'
    }
  },

  * delete() {
    const id = this.params.id
    const success = yield consul.deleteFeature(id)
    if (success) {
      this.body = 'ok'
    } else {
      this.status = 500
      this.message = 'Delete feature failed'
    }
  }
}
