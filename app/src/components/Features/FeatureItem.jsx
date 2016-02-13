import React from 'react';
import * as Components from 'components';


export default class FeatureItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapse: false,
    };
  }

  toggleCollapse = (e) => {
    e.preventDefault();
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    let featureContent = <div></div>;
    if (!this.state.collapse) {
      let values = this.props.feature.data.values;
      if (!values) {
        values = {};
      }
      const featureValues = (
        <Components.FeatureValues
          updateValues={this.props.updateValues}
          feature={this.props.feature}
          values={values} />
      );
      let partitions = this.props.feature.data.partitions;
      if (!partitions) {
        partitions = [];
      }
      const featurePartitions = (
        <Components.FeaturePartitions
          updatePartitions={this.props.updatePartitions}
          feature={this.props.feature}
          partitions={partitions} />
      );

      featureContent = (
        <div className="feature-content">
          { featureValues }
          { featurePartitions }
          <Components.FeatureRules
            feature={this.props.feature}
            rules={this.props.feature.data}
            addRule={this.props.addRule}
            removeRule={this.props.removeRule}
            updateRule={this.props.updateRule} />
        </div>
      );
    }
    return (
      <div className="FeatureItem">
        <div className="feature-service-header">
          <div className="title">
            <h1>{this.props.feature.service} service</h1>
          </div>
        </div>
        <div className="feature-container">
          <div className="feature">
            <span
              className="feature-collapse"
              onClick={this.toggleCollapse}>
                [{ this.state.collapse ? 'show' : 'hide' }]
            </span>
            <h1>{this.props.feature.id}</h1>
            { featureContent }
          </div>
        </div>
      </div>
    );
  }
}

FeatureItem.propTypes = {
  feature: React.PropTypes.object,
  addRule: React.PropTypes.func,
  removeRule: React.PropTypes.func,
  updateRule: React.PropTypes.func,
  updateValues: React.PropTypes.func,
  updatePartitions: React.PropTypes.func,
};
