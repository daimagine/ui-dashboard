import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import * as Pages from 'pages';
import store from '../stores';
import * as Containers from 'containers';
import history from 'utils/history';

export default function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={Containers.App}>
          <Route path="/" component={Containers.AppLayout}>
            <IndexRoute component={Pages.Features}/>
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}
