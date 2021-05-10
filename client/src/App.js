import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Promotions from './Promotions';
import PromotionEdit from './PromotionEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/promotions' exact={true} component={Promotions} />
          <Route path='/promotions/:id' component={PromotionEdit} />
        </Switch>
      </Router>
    )
  }
}

export default App;