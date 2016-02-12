import React from 'react';
import * as Components from 'components';


export default class FeatureValues extends React.Component {
  render() {
    return (
      <div className="feature-value-container">
        <h2>values</h2>
        <div className="feature-value-json">
          <Components.JsonObject json={this.props.values} />
        </div>
      </div>
    );
  }
}

FeatureValues.propTypes = {
  values: React.PropTypes.object,
};
