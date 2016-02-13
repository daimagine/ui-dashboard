import React from 'react';
import * as Components from 'components';


export default class FeatureList extends React.Component {
  render() {
    return (
      <div className="feature-list">
        { this.props.features.map((feature) =>
            <Components.FeatureItem key={feature.id}
              feature={feature}
              addRule={this.props.addRule}
              removeRule={this.props.removeRule}
              updateRule={this.props.updateRule}
              updateValues={this.props.updateValues}
              updatePartitions={this.props.updatePartitions} />
          )
        }
      </div>
    );
  }
}

FeatureList.propTypes = {
  features: React.PropTypes.array,
  addRule: React.PropTypes.func,
  removeRule: React.PropTypes.func,
  updateRule: React.PropTypes.func,
  updateValues: React.PropTypes.func,
  updatePartitions: React.PropTypes.func,
};
