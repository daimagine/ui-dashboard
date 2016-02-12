import React from 'react';
import {
  Button,
  Input,
} from 'react-bootstrap';


export default class FeatureRuleCreator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      creating: false,
      key: '',
    };
  }

  changeKey = (e) => {
    this.setState({ key: e.target.value });
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: true });
  }

  cancelCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: false });
  }

  createRule = (e) => {
    e.preventDefault();
    const key = this.state.key.trim();
    if (key !== '' && key !== 'values'
      && key !== 'partitions') {
      this.setState({
        creating: false,
        key: '',
      });
      this.props.addRule(this.props.feature, key);
    }
  }

  render() {
    if (!this.state.creating) {
      return (
        <Button
          className="adder-trigger"
          onClick={this.handleCreate}
          bsSize="xsmall">
            + feature rule
        </Button>
      );
    }
    return (
      <div className="adder-control">
        <Input type="text" placeholder="value"
          ref="attrValue"
          value={this.state.key}
          onChange={this.changeKey}
          bsSize="small"/>
        <Button bsSize="small"
          onClick={this.createRule}
          bsStyle="info">add</Button>
        <Button bsSize="small"
          onClick={this.cancelCreate}>cancel</Button>
      </div>
    );
  }
}

FeatureRuleCreator.propTypes = {
  feature: React.PropTypes.object,
  addRule: React.PropTypes.func,
};
