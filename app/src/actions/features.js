// import request from 'utils/request';


export function fetchFeaturesSuccess(features) {
  return {
    type: 'FETCH_FEATURES_SUCCESS',
    features,
  };
}

export function fetchFeatures() {
  // return (dispatch) => {
  //   request({
  //     url: 'features',
  //     method: 'GET',
  //   }).then(features => {
  //     dispatch(fetchFeaturesSuccess(features));
  //   });
  // };

  // example of return value features
  const features = [{
    id: 'rate_us',
    service: 'detect',
    data: {
      values: {
        key1: 'val1',
      },
      partitions: [
        {
          key2: 2,
        },
        {
          key2: {
            from: 3,
            to: 10,
            step: 1,
          },
        },
      ],
      user: [
        {
          filter: {
            iOS: '1.0.2',
          },
          values: {
            user_key1: 1,
          },
        },
      ],
    },
  }];
  return (dispatch) => {
    dispatch(fetchFeaturesSuccess(features));
  };
}
