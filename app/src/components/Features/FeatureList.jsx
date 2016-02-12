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
              removeRule={this.props.removeRule} />
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
};
