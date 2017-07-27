import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import configureStore from "./store/configureStore";
import registerServiceWorker from './registerServiceWorker';

import App from "./containers/App";

const history = createHashHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
