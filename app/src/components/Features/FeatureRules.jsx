import React from 'react';
import * as Components from 'components';


export default class FeatureRules extends React.Component {
  render() {
    const keys = Object.keys(this.props.rules);
    const rules = keys.map((key) => {
      if (key !== 'values' && key !== 'partitions') {
        return (
          <Components.FeatureRuleItem
            key={key}
            ruleKey={key}
            rule={this.props.rules[key]}
            feature={this.props.feature}
            removeRule={this.props.removeRule} />
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
