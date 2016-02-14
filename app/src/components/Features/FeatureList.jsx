import React from 'react';
import * as Components from 'components';


export default class FeatureList extends React.Component {
  render() {
    return (
      <div className="feature-list">
        <div className="feature-service-header">
          <div className="title">
            <h1>Feature List</h1>
          </div>
        </div>
        { this.props.features.map((feature) =>
            <Components.FeatureItem key={feature.id}
              feature={feature}
              removeFeature={this.props.removeFeature}
              addRule={this.props.addRule}
              removeRule={this.props.removeRule}
              updateRule={this.props.updateRule}
              updateValues={this.props.updateValues}
              updatePartitions={this.props.updatePartitions} />
          )
        }
        <div className="feature-adder">
          <Components.FeatureCreator
            addFeature={this.props.addFeature} />
        </div>
      </div>
    );
  }
}

FeatureList.propTypes = {
  features: React.PropTypes.array,
  addFeature: React.PropTypes.func,
  removeFeature: React.PropTypes.func,
  addRule: React.PropTypes.func,
  removeRule: React.PropTypes.func,
  updateRule: React.PropTypes.func,
  updateValues: React.PropTypes.func,
  updatePartitions: React.PropTypes.func,
};
