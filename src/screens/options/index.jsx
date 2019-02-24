import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/index';
import PageRequests from './page-requests/index';

//import 'bootstrap/dist/css/bootstrap.min.css';

import redurcers from 'redurcers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
const store = createStore(
  redurcers,
  applyMiddleware(
    thunkMiddleware
  )
);
window._store = store;

class Options extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/options.html" component={Home} />
            <Route path="/page-requests" component={PageRequests} />
          </Switch>
        </Router>
      </Provider>
    )
  }

}

ReactDOM.render(
  <Options/>,
  document.getElementById('root')
);
