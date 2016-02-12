import React from 'react';
import * as Components from 'components';


export default class JsonAttribute extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value ||
      nextProps.parent !== this.props.parent;
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
      attrKey = Number(this.props.attrKey) + 1;
    }
    return (
      <div className={className}>
        <div className="json-attribute-remove">
          <span onClick={this.handleRemove}>x</span>
        </div>
        <div className="json-attribute-name">
          <span>
            { attrKey }
          </span>
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
