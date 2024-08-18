import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
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
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle successful login        
        history.push("/");
        console.log("Login successful", data);
      } else {
        // Handle login error
        history.push("/auth/signup");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUpClick = () => {
    history.push("/auth/signup"); // Navigate to the sign-up page
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

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="mt-3 text-center">
            <span>New user? </span>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
