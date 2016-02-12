import React from 'react';
import { Input } from 'react-bootstrap';


export default class JsonNumberAttribute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value,
    };
  }

  setValue() {
    if (this.state.modified) {
      this.props.parent.set(
        this.props.attrKey,
        this.state.value
      );
    }
  }

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
      modified: e.target.value !== this.props.value,
    });
  }

  handleKeyDown = (e) => {
    if (e.which === 13) {
      this.setValue();
    }
  }

  render() {
    return (
      <div>
        <Input type="number" ref="input"
          className="json-value"
          defaultValue={this.state.value}
          onChange={this.updateValue}
          onBlur={this.setValue.bind(this)}
          onKeyDown={this.handleKeyDown} />
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

JsonNumberAttribute.propTypes = {
  parent: optionalPropTypes,
  value: React.PropTypes.number,
  attrKey: React.PropTypes.string,
};
