import React from 'react';
import * as Components from 'components';


export default class FeatureItem extends React.Component {
  render() {
    const rules = Object.keys(this.props.feature.data).map(key => {
      return {
        key: key,
        props: this.props.feature.data[key],
      };
    });
    return (
      <div className="feature-item">
        <h1>{this.props.feature.id}</h1>
        { rules.map(rule =>
          <Components.FeatureRule
            key={rule.key}
            rule={rule.props}
            id={rule.key} />
          )
        }
      </div>
    );
  }
}

FeatureItem.propTypes = {
  feature: React.PropTypes.object,
};
