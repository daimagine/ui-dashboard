import React from 'react';
import * as Components from 'components';


export default class JsonObjectAttribute extends React.Component {
  render() {
    const self = this;
    const keys = Object.keys(this.props.value);
    const attrs = keys.map((key) => {
      return (
        <Components.JsonAttribute
          parent={self.props.value}
          value={self.props.value[key]}
          key={key}
          attrKey={key}
          original={self.props.original[key]} />
      );
    });
    return (
      <div className="json-object-attr">
        <div className="json-object-toggle object">
          <span>Map [{keys.length}]</span>
        </div>
        <div className="json-object-toggle-value">
          {attrs}
        </div>
        <div className="json-object-adder">
          <Components.JsonAttributeCreator
            type="attribute"
            jsonType={this.props.jsonType}
            parent={this.props.value} />
        </div>
      </div>
    );
  }
}

const optionalPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number,
  React.PropTypes.object,
  React.PropTypes.array,
  React.PropTypes.bool,
]);

JsonObjectAttribute.propTypes = {
  value: optionalPropTypes,
  parent: optionalPropTypes,
  original: optionalPropTypes,
  attrKey: React.PropTypes.string,
  jsonType: React.PropTypes.string,
};
