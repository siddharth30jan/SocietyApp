import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import {
  Home,
  UserLogin,
  UserSignup,
  SocLogin,
  SocSignup
} from "./components/index";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/userlogin" exact component={UserLogin} />
          <Route path="/usersignup" exact component={UserSignup} />
          <Route path="/soclogin" exact component={SocLogin} />
          <Route path="/socsignup" exact component={SocSignup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
