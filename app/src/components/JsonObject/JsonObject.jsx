import React from 'react';
import Freezer from 'freezer-js';
import * as Components from 'components';


export default class JsonObject extends React.Component {
  constructor(props, context) {
    super(props, context);

    const frozen = new Freezer({ json: props.json });
    this.state = {
      store: frozen.get(),
      original: frozen.get(),
    };
  }

  componentDidMount() {
    const self = this;
    const listener = this.state.store.getListener();
    listener.on('update', (updated) => {
      console.log('store updated', updated);
      self.setState({ store: updated });
      this.props.updateJson(updated.json);
    });
  }

  render() {
    let className = Components.JsonObjectAttribute;
    if (this.state.store.json instanceof Array) {
      className = Components.JsonArrayAttribute;
    }
    const jsonObject = React.createElement(
      className,
      {
        value: this.state.store.json,
        original: this.state.original.json,
        jsonType: this.props.jsonType,
        updateJson: this.props.updateJson,
      }
    );
    return (
      <div className="json-object-container">
        { jsonObject }
      </div>
    );
  }
}

JsonObject.propTypes = {
  json: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  jsonType: React.PropTypes.string,
  updateJson: React.PropTypes.func,
};
