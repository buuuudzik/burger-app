import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" exact component={Orders}></Route>
            <Route path="/auth" exact component={Auth}></Route>
            <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;