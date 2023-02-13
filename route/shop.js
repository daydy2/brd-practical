const express = require("express");
const router = express.Router();
const {
  getShop,
  getSignup,
  getLogin,
  postRole,
} = require("../controller/shop");

router.get("/", getShop);
router.route("/login").get(getLogin);
router.route("/signup").get(getSignup);
router.post("/roles", postRole);
// router.route("/signup").post(postSignUp)

module.exports = router;
