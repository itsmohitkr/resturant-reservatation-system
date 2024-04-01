const router = require("express").Router();
const controller = require("./search.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.listByMobileNumber)
  .all(methodNotAllowed);

module.exports = router;
