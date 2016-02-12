import React from 'react';
import * as Components from 'components';


export default class JsonArrayAttribute extends React.Component {
  render() {
    const self = this;
    const keys = Object.keys(this.props.value);
    const attrs = this.props.value.map((value, key) => {
      return (
        <Components.JsonAttribute
          parent={self.props.value}
          value={value}
          key={key}
          attrKey={key + ''}
          original={self.props.original[key]}/>
      );
    });

    return (
      <div className="json-object-attr">
        <div className="json-object-toggle array">
          <span>Array [{keys.length}]</span>
        </div>
        <div className="json-object-toggle-value array">
          {attrs}
        </div>
        <div className="json-object-adder">
          <Components.JsonAttributeCreator
            type="attribute"
            parent={this.props.value}
            attrKey={keys.length} />
        </div>
      </div>
    );
  }
}

const optionalPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.object,
  React.PropTypes.array,
]);

JsonArrayAttribute.propTypes = {
  parent: optionalPropTypes,
  value: React.PropTypes.array,
  original: React.PropTypes.array,
  attrKey: React.PropTypes.string,
};
