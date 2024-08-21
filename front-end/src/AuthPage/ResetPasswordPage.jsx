import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ResetPasswordPage() {
      const { resetToken } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (newPassword !== confirmNewPassword) {
      setResetPasswordError({ message: "Passwords do not match." });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/reset-password?token=${resetToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              newPassword,
            },
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Your password has been successfully reset.");
        setResetPasswordError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        console.log("Reset password failed", errorData.error);
        setResetPasswordError({ message: errorData.error });
      }
    } catch (error) {
      console.error("Error:", error);
      setResetPasswordError({
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <h2 className="text-center mt-4">Restaurant Reservation System</h2>
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        {successMessage ? (
          <div className="alert alert-success">
            {successMessage}
            <Link to="/auth/login" className="btn btn-link">
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            className="p-4 shadow-sm rounded"
            style={{ width: "500px", backgroundColor: "#f6f8fa" }}
            onSubmit={handleSubmit}
          >
            <h3 className="text-center mb-4">Reset Password</h3>
            <ErrorAlert error={resetPasswordError} />

            <hr />
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
