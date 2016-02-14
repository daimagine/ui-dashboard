const _ = require('underscore');
const consul = require('../methods/consul');


module.exports = {
  * get() {
    const featuresArray = yield consul.getFeatures();
    this.response.body = featuresArray;
  }
}
