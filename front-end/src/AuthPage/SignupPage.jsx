import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert"; // Assuming ErrorAlert is in this path

function SignupPage() {
  const history = useHistory(); // Hook to navigate programmatically
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError(null); // Reset error state

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setSignupError({ message: "Passwords do not match!" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            full_name: formData.name,
            email: formData.email,
            password: formData.password,
          },
        }),
      });

      if (response.ok) {
        // Handle successful signup
        history.push("/auth/login"); // Navigate to the login page
      } else {
        const errorData = await response.json();
        setSignupError({ message: errorData.error || "Signup failed" });
      }
    } catch (error) {
      setSignupError({ message: "An unexpected error occurred" });
    }
  };

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
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Sign Up</h3>
          <ErrorAlert error={signupError} />
          <hr></hr>
          <div className="mb-3">
            <label htmlFor="signupInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="signupInputName"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
