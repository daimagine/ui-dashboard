import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import root from '../reducers/root';
import DevTools from '../containers/DevTools/DevTools';

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
  )(createStore);
const store = finalCreateStore(root);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/root', () => {
    const nextRootReducer = require('../reducers/root');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
