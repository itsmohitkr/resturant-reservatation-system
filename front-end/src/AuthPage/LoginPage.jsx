import React, { useState, useContext } from "react";
import {  Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ErrorAlert from "../layout/ErrorAlert";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const { setAuthState } = useContext(AuthContext); // Get setAuthState from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            data: {
              email,
              password,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful login
        console.log(data.data.data.full_name);
        
        setAuthState({
          isAuthenticated: true,
          user: data.data.data.full_name, // Assuming the response contains user data
          isLoading: false,
        });
        // history.push("/");
        console.log("Login successful", data);
      } else {
        const errorData = await response.json();
        console.log("Login failed", errorData.error);
        setLoginError({ message: errorData.error });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <h2 className="text-center mt-4">Restaurant Reservation System</h2>
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <form
          className="p-4 shadow-sm rounded"
          style={{ width: "500px", backgroundColor: "#f6f8fa" }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Login</h3>
          <ErrorAlert error={loginError} />
          <hr></hr>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <Link to="/auth/forgot-password" className="btn btn-link">
              Forgot password
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <Link to="/auth/signup" className="btn btn-link">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
