import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./AuthPage/LoginPage";
import SignupPage from "./AuthPage/SignupPage";

function App() {
  return (
    <Switch>
      <Route exact={true} path="/auth/login">
        <LoginPage />
      </Route>
      <Route exact={true} path="/auth/signup">
        <SignupPage />
      </Route>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
  );
}

export default App;
