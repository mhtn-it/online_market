import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./home.container";
import ItemContainer from "./item.container";
import CategoryContainer from "./category.container";
import ShopContainer from "./shop.container";
import ProducerContainer from "./producer.container";
import UserContainer from "./user.container";
import LoginContainer from "./login.container";
import StatisticalContainer from './statistical.container'
import BillContainer from './bill.container'
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/itemmanager" component={ItemContainer} />
          <Route exact path="/categorymanager" component={CategoryContainer} />
          <Route exact path="/shopmanager" component={ShopContainer} />
          <Route
            exact
            path="/producermanager"
            component={ProducerContainer}
          />
          <Route exact path="/usermanager" component={UserContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/statistical" component={StatisticalContainer} />
          <Route exact path="/billmanager" component={BillContainer} />
        </Switch>
      </Router>
    );
  }
}
export default App;
