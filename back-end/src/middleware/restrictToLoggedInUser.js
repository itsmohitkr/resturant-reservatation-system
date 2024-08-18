const axios = require("axios");

async function restrictToLoggedInUser(req, res, next) {
  const token = req.cookies?.token; // assuming your token is stored in a cookie named 'token'
  console.log("called");
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Send a request to the /verify-token route of your auth microservice
    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/verify-token`,
      {
        headers: {
          Cookie: `token=${token}`, // Send the cookie in the headers
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    req.user = response.data.user; // Store the user info in req.user for use in other routes
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = restrictToLoggedInUser;
