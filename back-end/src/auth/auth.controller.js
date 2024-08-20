const axios = require("axios");
const { response } = require("../app");

// Define the base URL for the authentication microservices
const { AUTH_SERVICE_URL } = process.env;

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body.data;
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/login`,
      {
        data: {
          email,
          password,
        },
      },
      {
        withCredentials: true, // Ensures the JWT cookie is included in the response
      }
    );

    // Set the cookie received from the microservices in the backend response
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader && setCookieHeader.length > 0) {
      const tokenCookie = setCookieHeader.find((cookie) =>
        cookie.startsWith("token=")
      );
      if (tokenCookie) {
        const tokenValue = tokenCookie.split(";")[0].split("=")[1];
        console.log("tokenValue: ", tokenValue);
        res.cookie("token", tokenValue);
      } else {
        console.log("No 'token' cookie found in 'set-cookie' header");
      }
    } else {
      console.log("No 'set-cookie' header found");
    }

    res.status(200).json({ message: "Login successful", data: response.data });
  } catch (error) {
    if (error.response) {
      return next({
        status: error.response.status,
        message: error.response.data.error || error.response.data.message,
      });
    } else {
      return next({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
};

const signup = async (req, res,next) => {
  try {
    const { full_name,email, password } = req.body.data;    
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/signup`,
      {
        data: {
          full_name,
          email,
          password,
        },
      },
      {
        withCredentials: true, // Ensures the JWT cookie is included in the response
      }
    );

    // Handle successful signup
    res.status(201).json({ message: "Signup successful", data: response.data });
  } catch (error) {
    // Handle signup failure
    const statusCode = error.response?.status || 400;
    const errorMessage =
      error.response?.data?.error || error.message || "Signup failed";

    return next({
      status: statusCode,
      message: errorMessage,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};

const verify = async (req, res) => {
  const token = req.cookies?.token; // assuming your token is stored in a cookie named 'token'

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/verify-token`, {
      headers: {
        Cookie: `token=${token}`, // Send the cookie in the headers
      },
      withCredentials: true, // Ensure the JWT cookie is included in the request
    });

    // Handle successful verification
    res.status(200).json({ message: "Token is valid", data: response.data });
  } catch (error) {
    // Handle verification failure
    res.status(401).json({
      message: "Invalid token",
      error: error.response?.data || error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body.data;

    const response = await axios.post(
      `${AUTH_SERVICE_URL}/forgot-password`,
      {
        data: {
          email,
        },
      },
      {
        withCredentials: true, // Ensure the JWT cookie is included in the request
      }
    );

    // Handle successful password reset request
    res
      .status(200)
      .json({ message: "Password reset email sent", data: response.data });
  } catch (error) {
    // Handle failed password reset request
    res.status(400).json({
      message: "Password reset failed",
      error: error.response?.data || error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body.data;

    const response = await axios.post(
      `${AUTH_SERVICE_URL}/reset-password`,
      {
        data: {
          token,
          newPassword,
        },
      },
      {
        withCredentials: true, // Ensure the JWT cookie is included in the request
      }
    );

    // Handle successful password reset
    res
      .status(200)
      .json({ message: "Password reset successful", data: response.data });
  } catch (error) {
    // Handle failed password reset
    res.status(400).json({
      message: "Password reset failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  login,
  signup,
  logout,
  verify,
  forgotPassword,
  resetPassword,
};
