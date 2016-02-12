import React from 'react';
import * as Components from 'components';


export default class FeatureRuleItem extends React.Component {
  render() {
    const rules = Object.keys(this.props.rule).map(key => {
      return {
        id: key,
        props: this.props.rule[key],
      };
    });
    return (
      <div className="feature-rule-item">
        <h1>{this.props.id}</h1>
        { rules.map(rule =>
          <Components.FeatureRuleSpec
            key={rule.id}
            rule={rule.props}
            id={rule.id} />
          )
        }
      </div>
    );
  }
}

FeatureRuleItem.propTypes = {
  id: React.PropTypes.string,
  rule: React.PropTypes.object,
};
