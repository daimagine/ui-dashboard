import React from 'react';
import {connect} from 'react-redux';
import {DevTools} from 'containers';


class AppLayout extends React.Component {

  render() {
    const {children} = this.props;

    return (
      <div className="app-container">
        <div className="content-wrapper">{children}</div>
        <DevTools />
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AppLayout);
