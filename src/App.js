import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import Checkout from './containers/Checkout/Checkout';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={AsyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout}></Route>
          <Route path="/orders" exact component={Orders}></Route>
          <Route path="/auth" exact component={AsyncCheckout}></Route>
          <Route path="/logout" exact component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      );
    };

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));