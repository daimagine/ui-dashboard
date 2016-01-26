import React from 'react';
import {connect} from 'react-redux';
import {fetchFeatures} from 'actions/features';
import * as Components from 'components';


class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchFeatures());
  }

  render() {
    return (
      <div>
        <Components.FeatureList
          features={this.props.features} />
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
