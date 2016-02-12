import React from 'react';
import * as Components from 'components';


export default class FeatureRules extends React.Component {
  render() {
    const keys = Object.keys(this.props.rules);
    const rules = keys.map((key) => {
      if (key !== 'values' && key !== 'partitions') {
        return (
          <div key={'rule-' + key} className="feature-rule-json">
            <h3>{key}</h3>
            <Components.JsonObject
              json={this.props.rules[key]} />
          </div>
        );
      }
    });
    return (
      <div className="feature-rules">
        <h2>rules</h2>
        { rules }
        <div className="rule-object-adder">
          <Components.FeatureRuleCreator
            feature={this.props.feature}
            addRule={this.props.addRule} />
        </div>
      </div>
    );
  }
}

FeatureRules.propTypes = {
  feature: React.PropTypes.object,
  rules: React.PropTypes.object,
  addRule: React.PropTypes.func,
  removeRule: React.PropTypes.func,
};
