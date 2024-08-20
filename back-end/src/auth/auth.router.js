const router = require("express").Router();
const controller = require("./auth.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/login").post(controller.login).all(methodNotAllowed);
router.route("/signup").post(controller.signup).all(methodNotAllowed);
router.route("/logout").post(controller.logout).all(methodNotAllowed);
router.route("/verify").get(controller.verify).all(methodNotAllowed);
router
  .route("/forgot-password")
  .post(controller.forgotPassword)
  .all(methodNotAllowed);
router
  .route("/reset-password")
  .post(controller.resetPassword)
  .all(methodNotAllowed);

module.exports = router;
