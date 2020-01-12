import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
