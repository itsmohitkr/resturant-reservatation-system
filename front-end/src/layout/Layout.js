import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Menu from "./Menu";
import Routes from "./Routes";
import { AuthContext } from "../Context/AuthContext";
import "./Layout.css";

function Layout() {
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuthState({ isAuthenticated: false, user: null });
    history.push("/auth/login");
  };

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <div className="row align-items-center py-3 bg-light">
            <div className="col text-right">
              <span className="mr-3">
                Welcome, {authState.user ? authState.user : "Guest"}
              </span>
              {authState.isAuthenticated && (
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
