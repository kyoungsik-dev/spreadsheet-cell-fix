import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css'
import SideMenu from './components/SideMenu';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body-wrapper container">
          <SideMenu />
          <div className="App-body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/item/:id" component={Item} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;