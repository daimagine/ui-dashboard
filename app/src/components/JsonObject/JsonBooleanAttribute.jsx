import React from 'react';


export default class JsonBooleanAttribute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value,
    };
  }

  updateValue = (e) => {
    const value = e.target.checked;
    this.setState({
      value: value,
    });
    this.props.parent.set(this.props.attrKey, value);
  }

  render() {
    return (
      <div>
        <input type="checkbox"
          checked={this.state.value}
          onChange={this.updateValue} />
      </div>
    );
  }
}

const optionalPropTypes = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.number,
  React.PropTypes.object,
  React.PropTypes.array,
]);

JsonBooleanAttribute.propTypes = {
  parent: optionalPropTypes,
  value: React.PropTypes.bool,
  attrKey: React.PropTypes.string,
};
