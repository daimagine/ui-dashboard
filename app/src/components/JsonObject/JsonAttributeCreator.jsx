import React from 'react';
import {
  Button,
  Input,
} from 'react-bootstrap';


export default class JsonAttributeCreator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      creating: false,
      attrKey: this.props.attrKey,
      type: 'string',
      boolValue: true,
      attrValue: '',
      attrName: '',
    };
  }

  handleCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: true });
  }

  cancelCreate = (e) => {
    e.preventDefault();
    this.setState({ creating: false });
  }

  changeType = (e) => {
    e.preventDefault();
    const type = e.target.value;
    this.setState({
      type: type,
    });
  }

  changeBoolValue = (e) => {
    this.setState({
      boolValue: e.target.checked,
    });
  }

  changeAttrValue = (e) => {
    this.setState({
      attrValue: e.target.value,
    });
  }

  changeAttrName = (e) => {
    e.preventDefault();
    this.setState({
      attrName: e.target.value,
    });
  }

  createAttribute = (e) => {
    e.preventDefault();
    const parent = this.props.parent;
    const type = this.state.type;
    const attrName = this.state.attrName.trim();
    let value = this.state.attrValue.trim();
    let valid = true;
    if (parent.constructor === Array) {
      if (type === 'string' && value === '') {
        valid = false;
      }
    } else if (attrName === '') {
      valid = false;
    }
    if (valid) {
      if (type === 'boolean') {
        value = this.state.boolValue;
      } else if (type === 'array') {
        value = [];
      } else if (type === 'object') {
        value = {};
      }
      if (parent.constructor === Array) {
        parent.push(value);
      } else {
        parent.set(attrName, value);
      }
      this.setState({
        attrName: '',
        attrValue: '',
        boolValue: true,
      });
    }
  }

  render() {
    if (!this.state.creating) {
      return (
        <Button
          className="adder-trigger"
          onClick={this.handleCreate}
          bsSize="xsmall">+</Button>
      );
    }
    let attrName;
    if (typeof this.props.attrKey !== 'undefined') {
      let attrKey = this.state.attrKey;
      if (this.props.parent.constructor === Array) {
        attrKey = Number(this.props.attrKey) + 1;
      }
      attrName = (
        <span className="separator-h">
          {attrKey} :
        </span>
      );
    } else {
      attrName = (
        <div className="adder-attr-config">
          <Input type="text" placeholder="name"
            ref="attrName"
            value={this.state.attrName}
            onChange={this.changeAttrName}
            bsSize="small"/>
          <span className="separator-h">:</span>
        </div>
      );
    }

    let attrValue = <span></span>;
    if (this.state.type === 'string') {
      attrValue = (
        <Input type="text" placeholder="value"
          ref="attrValue"
          value={this.state.attrValue}
          onChange={this.changeAttrValue}
          bsSize="small"/>
      );
    } else if (this.state.type === 'boolean') {
      attrValue = (
        <div className="adder-attr-config">
          <span className="separator-h">value: </span>
          <input type="checkbox"
            checked={this.state.boolValue}
            onChange={this.changeBoolValue} />
          <span className="separator-h"></span>
        </div>
      );
    }

    return (
      <div className="adder-control">
        { attrName }
        <Input type="select" placeholder="select"
          ref="type" onChange={this.changeType}
          bsSize="small">
            <option value="string">text</option>
            <option value="array">array</option>
            <option value="object">object</option>
            <option value="boolean">boolean</option>
        </Input>
        { attrValue }
        <Button bsSize="small"
          onClick={this.createAttribute}
          bsStyle="info">add</Button>
        <Button bsSize="small"
          onClick={this.cancelCreate}>cancel</Button>
      </div>
    );
  }
}

const optionalPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number,
]);

const optionalParentPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.object,
  React.PropTypes.array,
]);

JsonAttributeCreator.propTypes = {
  attrKey: optionalPropTypes,
  parent: optionalParentPropTypes,
};
