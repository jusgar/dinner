import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome.js';
import Dinner from './components/Dinner.js';
import DishDetails from './components/DishDetails.js';

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ok <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/

    <Router>
      <div className="container-fluid">
        <div className="row front">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1 className="text-center" style={{ padding: '35px' }}>
              Dinner planner
            </h1>
          </div>
          <div className="col-md-4"></div>
        </div>
        <Switch>
          <Route path="/dinner/dish/:id" component={DishDetails} />
          <Route path="/dinner" exact component={Dinner} />
          <Route path="/" exact component={Welcome} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
