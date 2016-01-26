import request from 'utils/request';


export function fetchFeaturesSuccess(features) {
  return {
    type: 'FETCH_FEATURES_SUCCESS',
    features,
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
}
