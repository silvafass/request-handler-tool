import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/index';
import PageRequests from './page-requests/index';

import store from './data/store';
import { defaultAction } from './data/actions';

import 'bootstrap/dist/css/bootstrap.min.css';

window._store = store;

class Options extends React.Component {

  constructor(props) {
    super(props);
    store.dispatch(defaultAction());
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
