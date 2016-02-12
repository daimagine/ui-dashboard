import React from 'react';
import * as Components from 'components';
import {
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';


export default class FeatureItem extends React.Component {
  render() {
    return (
      <div className="FeatureItem">
        <div className="feature-service-header">
          <div className="title">
            <h1>{this.props.feature.service} service</h1>
          </div>
        </div>
        <div className="feature-container">
          <div className="feature">
            <h1>{this.props.feature.id}</h1>
            <DropdownButton title="+ add component" id="ddown-feature"
              bsSize="xsmall" bsStyle="info">
                <MenuItem>values</MenuItem>
                <MenuItem>partition</MenuItem>
                <MenuItem>rule</MenuItem>
            </DropdownButton>

            <Components.FeatureValues
              values={this.props.feature.data.values} />

            <Components.FeaturePartitions
              partitions={this.props.feature.data.partitions} />
          </div>
        </div>
      </div>
    );
  }
}

FeatureItem.propTypes = {
  feature: React.PropTypes.object,
};
