import React from "react";
import { useHistory } from "react-router-dom";

function SignupPage() {
  const history = useHistory(); // Hook to navigate programmatically

  const handleLoginClick = () => {
    history.push("/auth/login"); // Navigate to the login page
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <h2 className="text-center mt-4">Restaurant Reservation System</h2>
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <form
          className="p-4 shadow-sm rounded"
          style={{ width: "500px", backgroundColor: "#f6f8fa" }}
        >
          <h3 className="text-center mb-4">Sign Up</h3>
          <hr></hr>
          <div className="mb-3">
            <label htmlFor="signupInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="signupInputName"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signupInputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="signupInputEmail"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signupInputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="signupInputPassword"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signupInputConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="signupInputConfirmPassword"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="mt-3 text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleLoginClick}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
