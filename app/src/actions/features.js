import request from 'utils/request';


export function fetchFeaturesSuccess(features) {
  return {
    type: 'FETCH_FEATURES_SUCCESS',
    features,
  };
}

export function updateFeatureSuccess(feature) {
  return {
    type: 'UPDATE_FEATURE_SUCCESS',
    feature,
  };
}

export function deleteFeatureSuccess(id) {
  return {
    type: 'DELETE_FEATURE_SUCESSS',
    id,
  };
}

export function fetchFeatures() {
  return (dispatch) => {
    request({
      url: 'features',
      method: 'GET',
    }).then(features => {
      dispatch(fetchFeaturesSuccess(features));
    });
  };

  // example of return value features
  // const features = [{
  //   id: 'detect:rate_us',
  //   key: 'rate_us',
  //   service: 'detect',
  //   data: {
  //     values: {
  //       key1: 'val1',
  //     },
  //     partitions: [
  //       {
  //         key2: 2,
  //       },
  //       {
  //         key2: {
  //           from: 3,
  //           to: 10,
  //           step: 1,
  //         },
  //       },
  //     ],
  //     user: [
  //       {
  //         filter: {
  //           iOS: '1.0.2',
  //         },
  //         values: {
  //           user_key1: 1,
  //         },
  //       },
  //     ],
  //   },
  // }, {
  //   id: 'detect:subsribe_us',
  //   key: 'rate_us',
  //   service: 'detect',
  //   data: {
  //     values: {
  //       key2: 'val2',
  //     },
  //   },
  // }];
  // return (dispatch) => {
  //   dispatch(fetchFeaturesSuccess(features));
  // };
}

export function addFeature(key, service) {
  return (dispatch) => {
    const newFeature = {
      id: `${service}:${key}`,
      key: key,
      service: service,
      data: {},
    };
    request({
      url: 'features',
      method: 'POST',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}

export function removeFeature(id) {
  return (dispatch) => {
    request({
      url: `features/${id}`,
      method: 'DELETE',
    }).then((status) => {
      console.log(status);
      dispatch(deleteFeatureSuccess(id));
    });
  };
}

export function addFeatureRule(feature, key) {
  return (dispatch, getState) => {
    const state = getState();
    const features = state.entities.features;
    const newFeature = Object.assign({}, features[feature.id]);
    newFeature.data[key] = [];
    request({
      url: `features/${newFeature.id}`,
      method: 'PUT',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}

export function removeFeatureRule(feature, key) {
  return (dispatch, getState) => {
    const state = getState();
    const features = state.entities.features;
    const newFeature = Object.assign({}, features[feature.id]);
    delete newFeature.data[key];
    request({
      url: `features/${newFeature.id}`,
      method: 'PUT',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}

export function updateFeatureRule(feature, key, rule) {
  return (dispatch, getState) => {
    const state = getState();
    const features = state.entities.features;
    const newFeature = Object.assign({}, features[feature.id]);
    newFeature.data[key] = rule;
    request({
      url: `features/${newFeature.id}`,
      method: 'PUT',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}

export function updateValues(feature, values) {
  return (dispatch, getState) => {
    const state = getState();
    const features = state.entities.features;
    const newFeature = Object.assign({}, features[feature.id]);
    newFeature.data.values = values;
    request({
      url: `features/${newFeature.id}`,
      method: 'PUT',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}

export function updatePartitions(feature, partitions) {
  return (dispatch, getState) => {
    const state = getState();
    const features = state.entities.features;
    const newFeature = Object.assign({}, features[feature.id]);
    newFeature.data.partitions = partitions;
    request({
      url: `features/${newFeature.id}`,
      method: 'PUT',
      body: newFeature,
    }).then(f => {
      dispatch(updateFeatureSuccess(f));
    });
  };
}
