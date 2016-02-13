import React from 'react';
import * as Components from 'components';


export default class FeaturePartitions extends React.Component {
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

  handleUpdate = (partitions) => {
    this.props.updatePartitions(this.props.feature, partitions);
  }

  render() {
    let content = (
      <div className="feature-json-preview">
        <pre>
          { JSON.stringify(this.props.partitions, null, 2) }
        </pre>
      </div>
    );
    if (!this.state.preview) {
      content = (
        <div className="feature-value-json">
          <Components.JsonObject
            jsonType="partition"
            json={this.props.partitions}
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
        <h2>partitions</h2>
        { content }
      </div>
    );
  }
}

FeaturePartitions.propTypes = {
  feature: React.PropTypes.object,
  partitions: React.PropTypes.array,
  updatePartitions: React.PropTypes.func,
};
