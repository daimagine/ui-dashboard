import React from 'react';
import {connect} from 'react-redux';
import {
  fetchFeatures,
  addFeature,
  removeFeature,
  addFeatureRule,
  removeFeatureRule,
  updateFeatureRule,
  updateValues,
  updatePartitions,
} from 'actions/features';
import * as Components from 'components';


class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchFeatures());
  }

  addFeature = (key, service) => {
    console.log('add feature', key, service);
    this.props.dispatch(addFeature(key, service));
  }

  removeFeature = (key) => {
    console.log('remove feature', key);
    this.props.dispatch(removeFeature(key));
  }

  addRule = (feature, key) => {
    console.log('add rule', feature, key);
    this.props.dispatch(addFeatureRule(feature, key));
  }

  removeRule = (feature, key) => {
    console.log('remove rule', feature, key);
    this.props.dispatch(removeFeatureRule(feature, key));
  }

  updateRule = (feature, key, rule) => {
    console.log('update rule', feature, key, rule);
    this.props.dispatch(updateFeatureRule(feature, key, rule));
  }

  updateValues = (feature, values) => {
    console.log('update values', feature, values);
    this.props.dispatch(updateValues(feature, values));
  }

  updatePartitions = (feature, partitions) => {
    console.log('update partitions', feature, partitions);
    this.props.dispatch(updatePartitions(feature, partitions));
  }

  render() {
    return (
      <div>
        <Components.FeatureList
          features={this.props.features}
          addFeature={this.addFeature}
          removeFeature={this.removeFeature}
          addRule={this.addRule}
          removeRule={this.removeRule}
          updateRule={this.updateRule}
          updateValues={this.updateValues}
          updatePartitions={this.updatePartitions} />
      </div>
    );
  }
}

Features.propTypes = {
  features: React.PropTypes.array,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    features: Object.keys(state.entities.features).map(key => {
      return state.entities.features[key];
    }),
  };
}

export default connect(mapStateToProps)(Features);
