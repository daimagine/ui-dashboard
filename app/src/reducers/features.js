export default function features(state = {}, action) {
  switch (action.type) {
  case 'FETCH_FEATURES_SUCCESS':
    const newFeatures = {};
    action.features.forEach((feature) => {
      newFeatures[feature.id] = feature;
    });
    return Object.assign({}, state, newFeatures);
  case 'UPDATE_FEATURE_RULE_SUCCESS':
    const updatedRuleFeatures = {};
    updatedRuleFeatures[action.feature.id] = action.feature;
    return Object.assign({}, state, updatedRuleFeatures);
  default:
    return state;
  }
}
