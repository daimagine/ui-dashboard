import React from 'react';
import * as Components from 'components';


export default class FeatureValues extends React.Component {
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

  handleUpdate = (values) => {
    this.props.updateValues(this.props.feature, values);
  }

  render() {
    let content = (
      <div className="feature-json-preview">
        <pre>
          { JSON.stringify(this.props.values, null, 2) }
        </pre>
      </div>
    );
    if (!this.state.preview) {
      content = (
        <div className="feature-value-json">
          <Components.JsonObject
            jsonType="values"
            json={this.props.values}
            updateJson={this.handleUpdate} />
        </div>
      );
    }
    return (
      <div className="feature-value-container">
        <span
          className="feature-collapse values"
          onClick={this.togglePreview}>
            [{ this.state.preview ? 'edit' : 'preview' }]
        </span>
        <h2>values</h2>
        { content }
      </div>
    );
  }
}

FeatureValues.propTypes = {
  feature: React.PropTypes.object,
  values: React.PropTypes.object,
  updateValues: React.PropTypes.func,
};
