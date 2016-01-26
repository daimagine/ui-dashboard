export default function features(state = {}, action) {
  switch (action.type) {
  case 'FETCH_FEATURES_SUCCESS':
    const newFeatures = {};
    action.features.forEach((feature) => {
      newFeatures[feature.id] = feature;
    });
    return Object.assign({}, state, newFeatures);
  default:
    return state;
  }
}
