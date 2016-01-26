import React from 'react';
import * as Components from 'components';


export default class FeatureList extends React.Component {
  render() {
    return (
      <div className="feature-list">
        { this.props.features.map((feature, number) =>
          <Components.FeatureItem
            key={feature.id}
            feature={feature}
            number={number} />
          )
        }
      </div>
    );
  }
}

FeatureList.propTypes = {
  features: React.PropTypes.array,
};
