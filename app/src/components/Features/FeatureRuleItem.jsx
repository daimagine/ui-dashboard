import React from 'react';
import * as Components from 'components';


export default class FeatureRuleItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ruleKey: this.props.ruleKey,
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.feature !== this.props.feature;
  }

  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeRule(
      this.props.feature,
      this.props.ruleKey
    );
  }

  handleUpdate = (rule) => {
    this.props.updateRule(
      this.props.feature,
      this.props.ruleKey,
      rule
    );
  }

  render() {
    return (
      <div className="feature-rule-json">
        <div className="rule-header">
          <div className="remove-rule">
            <span onClick={this.handleRemove}>x</span>
          </div>
          <h3>{this.props.ruleKey}</h3>
        </div>
        <Components.JsonObject
          jsonType="rules"
          json={this.props.rule}
          updateJson={this.handleUpdate} />
      </div>
    );
  }
}

FeatureRuleItem.propTypes = {
  ruleKey: React.PropTypes.string,
  rule: React.PropTypes.array,
  removeRule: React.PropTypes.func,
  updateRule: React.PropTypes.func,
  feature: React.PropTypes.object,
};
