const express = require("express");
const router = express.Router();
const {
  getShop,
  getSignup,
  getLogin,
  postRole,
  postSignup,
} = require("../controller/shop");

router.get("/", getShop);
router.get("/login", getLogin);
// router.post("/login", getLogin);
router.route("/signup").get(getSignup);
router.post("/roles", postRole);
router.post("/signup", postSignup);

module.exports = router;
