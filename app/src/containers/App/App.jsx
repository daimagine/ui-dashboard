import React from 'react';
import {connect} from 'react-redux';

export default class App extends React.Component {
  render() {
    return this.props.children;
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
