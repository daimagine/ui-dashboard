const _ = require('underscore');
const consul = require('../methods/consul');


module.exports = {
  * get() {
    const featuresArray = yield consul.getFeatures();
    console.log('featuresArray', featuresArray);
    this.response.body = featuresArray;
  }
}