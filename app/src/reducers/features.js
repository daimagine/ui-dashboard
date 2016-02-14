export default function features(state = {}, action) {
  switch (action.type) {
  case 'FETCH_FEATURES_SUCCESS':
    const newFeatures = {};
    action.features.forEach((feature) => {
      newFeatures[feature.id] = feature;
    });
    return Object.assign({}, state, newFeatures);
  case 'UPDATE_FEATURE_SUCCESS':
    const updatedFeatures = {};
    updatedFeatures[action.feature.id] = action.feature;
    return Object.assign({}, state, updatedFeatures);
  case 'DELETE_FEATURE_SUCESSS':
    const updatedDeleteFeatures = Object.assign({}, state);
    delete updatedDeleteFeatures[action.id];
    return Object.assign({}, updatedDeleteFeatures);
  default:
    return state;
  }
}
