import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import "./Layout.css";

function Layout() {
  // Assuming you have a way to get the current user's info
  const user = {
    name: "John Doe", // Replace with actual user data from context or props
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing cookies, redirecting to login page)
    console.log("User logged out");
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
              <span className="mr-3">Welcome, {user.name}</span>
              <button
                className="btn btn-outline-primary"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
