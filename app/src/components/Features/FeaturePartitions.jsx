import React from 'react';
import * as Components from 'components';


export default class FeaturePartitions extends React.Component {
  render() {
    return (
      <div className="feature-value-container">
        <h2>partitions</h2>
        <div className="feature-value-json">
          <Components.JsonObject
            json={this.props.partitions} />
        </div>
      </div>
    );
  }
}

FeaturePartitions.propTypes = {
  partitions: React.PropTypes.array,
};
