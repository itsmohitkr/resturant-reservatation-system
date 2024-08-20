import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./AuthPage/LoginPage";
import SignupPage from "./AuthPage/SignupPage";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { authState } = useContext(AuthContext);

  if (authState.isLoading) {
    // Show a loading indicator while verifying the token
    return <div>Loading...</div>;
  }
  return (
    <Switch>
      <Route exact path="/auth/login">
        {authState.isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route exact path="/auth/signup">
        {authState.isAuthenticated ? <Redirect to="/" /> : <SignupPage />}
      </Route>
      <Route path="/">
        {authState.isAuthenticated ? <Layout /> : <Redirect to="/auth/login" />}
      </Route>
    </Switch>
  );
}

export default App;
