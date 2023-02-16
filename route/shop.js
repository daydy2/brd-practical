const express = require("express");
const router = express.Router();
const {
  getShop,
  getSignup,
  getLogin,
  postRole,
  postSignup,
  postLogin,
  getProduct,
  postLogout,
} = require("../controller/shop");
const {authCheck} = require('../middleware/authCheck')

router.get("/", authCheck, getShop);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.route("/signup").get(getSignup);
router.post("/roles", postRole);
router.post("/signup", postSignup);
router.get('/products/:prodId', getProduct)
router.post('/logout', postLogout)

module.exports = router;
