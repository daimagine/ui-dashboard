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

  handleRemove = (e) => {
    e.preventDefault();
    this.props.removeFeature(this.props.feature.id);
  }

  render() {
    let featureContent = <div></div>;
    if (!this.state.collapse) {
      let values = {};
      if (this.props.feature.data
        && this.props.feature.data.values) {
        values = this.props.feature.data.values;
      }
      const featureValues = (
        <Components.FeatureValues
          updateValues={this.props.updateValues}
          feature={this.props.feature}
          values={values} />
      );
      let partitions = [];
      if (this.props.feature.data
        && this.props.feature.data.partitions) {
        partitions = this.props.feature.data.partitions;
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
        <div className="feature-container">
          <div className="feature">
            <div className="feature-header">
              <span
                className="feature-collapse"
                onClick={this.toggleCollapse}>
                  [{ this.state.collapse ? 'show' : 'hide' }]
              </span>
              <span
                className="feature-collapse"
                onClick={this.handleRemove}>
                  [remove]
              </span>
              <h1>{this.props.feature.key}</h1>
              <h2 className="subtitle">
                {this.props.feature.service} service
              </h2>
            </div>
            { featureContent }
          </div>
        </div>
      </div>
    );
  }
}

FeatureItem.propTypes = {
  feature: React.PropTypes.object,
  removeFeature: React.PropTypes.func,
  addRule: React.PropTypes.func,
  removeRule: React.PropTypes.func,
  updateRule: React.PropTypes.func,
  updateValues: React.PropTypes.func,
  updatePartitions: React.PropTypes.func,
};
