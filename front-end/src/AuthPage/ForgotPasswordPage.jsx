import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ForgotPasswordPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            data: {
              email,
            },
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("A password reset link has been sent to your email.");
        setForgotPasswordError(null); // Clear any previous errors
        setEmail("");
         setTimeout(() => {
           history.push("/auth/login");
         }, 10000);
      } else {
        const errorData = await response.json();
        console.log("Forgot password failed", errorData.error);
        setForgotPasswordError({ message: errorData.error });
      }
    } catch (error) {
      console.error("Error:", error);
      setForgotPasswordError({
        message: "An error occurred. Please try again.",
      });
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
          <h3 className="text-center mb-4">Forgot Password</h3>
          <ErrorAlert error={forgotPasswordError} />
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <hr />
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

          <div className="d-flex justify-content-between mb-3">
            <Link to="/auth/login" className="btn btn-link">
              Back to Login
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
