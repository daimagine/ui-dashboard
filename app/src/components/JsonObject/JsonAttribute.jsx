import React from 'react';
import { Input } from 'react-bootstrap';
import * as Components from 'components';


export default class JsonAttribute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      attrKey: this.props.attrKey,
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value ||
      nextProps.attrKey !== this.props.attrKey ||
      nextProps.parent !== this.props.parent;
  }

  setAttrKey() {
    if (this.state.modified) {
      if (this.props.parent.constructor === Array) {
        this.props.parent.splice(this.props.attrKey, 1)
          .set(
            this.state.attrKey,
            this.props.value
          );
      } else {
        this.props.parent.remove(this.props.attrKey)
          .set(
            this.state.attrKey,
            this.props.value
          );
      }
    }
  }

  updateAttrKey = (e) => {
    this.setState({
      attrKey: e.target.value,
      modified: e.target.value !== this.props.attrKey,
    });
  }

  handleKeyDown = (e) => {
    if (e.which === 13) {
      this.setAttrKey();
    }
  }

  guessType(value) {
    const type = typeof value;
    if (type !== 'object') {
      return type;
    } else if (value instanceof Array) {
      return 'array';
    } else if (value instanceof Date) {
      return 'date';
    } else if (value instanceof Number) {
      return 'number';
    } else if (value instanceof Boolean) {
      return 'boolean';
    }
    return 'object';
  }

  createAttribute() {
    const typeDefaultValues = {
      string: '',
      object: {},
      array: [],
      number: 0,
      boolean: true,
    };
    const type = this.guessType(this.props.value);
    const parentType = this.guessType(this.props.parent);
    let className = Components.JsonStringAttribute;
    let original = this.props.original;
    let attrKey = this.props.attrKey;

    if (type === 'object') {
      className = Components.JsonObjectAttribute;
    } else if (type === 'array') {
      className = Components.JsonArrayAttribute;
    } else if (type === 'number') {
      className = Components.JsonNumberAttribute;
    } else if (type === 'boolean') {
      className = Components.JsonBooleanAttribute;
    }

    if (typeof original === 'undefined') {
      original = typeDefaultValues[type];
    }
    if (typeof attrKey === 'undefined') {
      attrKey = '';
    }

    const typeAttribute = React.createElement(
      className,
      {
        value: this.props.value,
        parent: this.props.parent,
        original: original,
        attrKey: attrKey,
      }
    );

    const classType = 'json-attribute'
      + ' attr-' + type
      + ' parent-' + parentType;

    return {
      typeAttribute: typeAttribute,
      className: classType,
    };
  }

  handleRemove = (e) => {
    e.preventDefault();
    if (this.props.parent.constructor === Array) {
      this.props.parent.splice(this.props.attrKey, 1);
    } else {
      this.props.parent.remove(this.props.attrKey);
    }
  }

  render() {
    const { typeAttribute, className } = this.createAttribute();
    let attrKey = this.props.attrKey;
    if (this.props.parent.constructor === Array) {
      attrKey = (
        <span>
          { Number(this.props.attrKey) + 1 }
        </span>
      );
    } else {
      attrKey = (
        <Input type="text" ref="input"
          className="json-attr"
          defaultValue={this.state.attrKey}
          onChange={this.updateAttrKey}
          onBlur={this.setAttrKey.bind(this)}
          onKeyDown={this.handleKeyDown} />
      );
    }
    return (
      <div className={className}>
        <div className="json-attribute-remove">
          <span onClick={this.handleRemove}>x</span>
        </div>
        <div className="json-attribute-name">
          { attrKey }
        </div>
        <div className="json-attribute-value">
          { typeAttribute }
        </div>
      </div>
    );
  }
}

const optionalParentPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number,
  React.PropTypes.object,
  React.PropTypes.array,
]);

const optionalPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number,
  React.PropTypes.object,
  React.PropTypes.array,
  React.PropTypes.bool,
]);

JsonAttribute.propTypes = {
  parent: optionalParentPropTypes,
  value: optionalPropTypes,
  original: optionalPropTypes,
  attrKey: React.PropTypes.string,
};
