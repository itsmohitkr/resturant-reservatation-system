const path = require("path");


const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");
const searchRouter = require("./search/search.router");
const authRouter = require("./auth/auth.router");

const restrictToLoggedInUser = require("./middleware/restrictToLoggedInUser.js");

const app = express();


// app.use(cors());
app.use(
  cors({
    origin: [
      "https://resturant-reservatation.onrender.com",
      "https://resturant-reservatation-system.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(restrictToLoggedInUser);

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);
app.use("/search", searchRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
