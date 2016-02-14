import React from 'react';
import {
  Button,
  Input,
} from 'react-bootstrap';


export default class FeatureCreator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      creating: false,
      key: '',
      service: '',
    };
  }

  changeKey = (e) => {
    this.setState({ key: e.target.value });
  }

  changeService = (e) => {
    this.setState({ service: e.target.value });
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: true });
  }

  cancelCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: false });
  }

  createFeature = (e) => {
    e.preventDefault();
    const key = this.state.key.trim();
    const service = this.state.service.trim();
    if (key !== '' && service !== '') {
      this.setState({
        creating: false,
        key: '',
        service: '',
      });
      this.props.addFeature(key, service);
    }
  }

  render() {
    if (!this.state.creating) {
      return (
        <Button
          className="adder-trigger"
          onClick={this.handleCreate}
          bsStyle="primary"
          bsSize="medium">
            + feature
        </Button>
      );
    }
    return (
      <div className="adder-control">
        <Input type="text" placeholder="service"
          ref="attrService"
          value={this.state.service}
          onChange={this.changeService}
          bsSize="small"/>
        <Input type="text" placeholder="feature"
          ref="attrValue"
          value={this.state.key}
          onChange={this.changeKey}
          bsSize="small"/>
        <Button bsSize="small"
          onClick={this.createFeature}
          bsStyle="info">add</Button>
        <Button bsSize="small"
          onClick={this.cancelCreate}>cancel</Button>
      </div>
    );
  }
}

FeatureCreator.propTypes = {
  addFeature: React.PropTypes.func,
};
