import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./AuthPage/LoginPage";
import SignupPage from "./AuthPage/SignupPage";
import { AuthContext } from "./Context/AuthContext";
import ForgotPasswordPage from "./AuthPage/ForgotPasswordPage";
import ResetPasswordPage from "./AuthPage/ResetPasswordPage";

function App() {
  const { authState } = useContext(AuthContext);

 if (authState.isLoading) {
   // Show a Bootstrap spinner while verifying the token
   return (
     <div className="d-flex justify-content-center align-items-center vh-100">
       <div className="spinner-border" role="status">
         <span className="visually-hidden"></span>
       </div>
     </div>
   );
 }
  return (
    <Switch>
      <Route exact path="/auth/reset-password/:resetToken">
        <ResetPasswordPage />
      </Route>
      <Route exact path="/auth/forgot-password">
        <ForgotPasswordPage />
      </Route>
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
