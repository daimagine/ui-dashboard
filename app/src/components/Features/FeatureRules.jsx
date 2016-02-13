import React from 'react';
import * as Components from 'components';


export default class FeatureRules extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      preview: false,
    };
  }

  togglePreview = (e) => {
    e.preventDefault();
    this.setState({
      preview: !this.state.preview,
    });
  }

  render() {
    let content = (
      <div className="feature-json-preview">
        <pre>
          { JSON.stringify(this.props.rules, null, 2) }
        </pre>
      </div>
    );
    if (!this.state.preview) {
      const keys = Object.keys(this.props.rules);
      content = keys.map((key) => {
        if (key !== 'values' && key !== 'partitions') {
          return (
            <Components.FeatureRuleItem
              key={key}
              ruleKey={key}
              rule={this.props.rules[key]}
              feature={this.props.feature}
              removeRule={this.props.removeRule}
              updateRule={this.props.updateRule} />
          );
        }
      });
    }
    return (
      <div className="feature-rules">
        <span
          className="feature-collapse values"
          onClick={this.togglePreview}>
            [{ this.state.preview ? 'edit' : 'preview' }]
        </span>
        <h2>rules</h2>
        { content }
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
  updateRule: React.PropTypes.func,
};
