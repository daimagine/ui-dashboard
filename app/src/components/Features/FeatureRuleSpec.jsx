import React from 'react';


export default class FeatureRuleSpec extends React.Component {
  render() {
    let filterDiv;
    if (this.props.rule.filter) {
      const filter = this.props.rule.filter;
      const filterData = JSON.stringify(filter);
      const filterRows = filterData.length > 2 ? 5 : 1;
      filterDiv = (
        <div className="spec-filter">
          <h3>filter</h3>
          <textarea cols="30"
            rows={filterRows}
            defaultValue={filterData} />
          <pre>
            {JSON.stringify(filter, null, 2)}
          </pre>
        </div>
      );
    } else {
      filterDiv = <div></div>;
    }

    let valuesDiv;
    if (this.props.rule.values) {
      const values = this.props.rule.values;
      const valuesData = JSON.stringify(values);
      const valuesRows = valuesData.length > 2 ? 5 : 1;
      valuesDiv = (
        <div className="spec-values">
          <h3>values</h3>
          <textarea cols="30"
            rows={valuesRows}
            defaultValue={valuesData} />
          <pre>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      );
    } else {
      valuesDiv = <div></div>;
    }

    return (
      <div className="feature-rule-spec">
        <h1>{this.props.id}</h1>
        {filterDiv}
        {valuesDiv}
      </div>
    );
  }
}

FeatureRuleSpec.propTypes = {
  id: React.PropTypes.string,
  rule: React.PropTypes.object,
};
