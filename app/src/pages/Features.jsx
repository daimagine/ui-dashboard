import React from 'react';
import {connect} from 'react-redux';
import {
  fetchFeatures,
  addFeatureRule,
  removeFeatureRule,
} from 'actions/features';
import * as Components from 'components';


class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchFeatures());
  }

  addRule = (feature, key) => {
    console.log('add rule', feature, key);
    this.props.dispatch(addFeatureRule(feature, key));
  }

  removeRule = (feature, key) => {
    console.log('remove rule', feature, key);
    this.props.dispatch(removeFeatureRule(feature, key));
  }

  render() {
    return (
      <div>
        <Components.FeatureList
          features={this.props.features}
          addRule={this.addRule}
          removeRule={this.removeRule} />
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
