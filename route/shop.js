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
  getAddProduct,
  postAddProductPage,
} = require("../controller/shop");
const { authCheck } = require("../middleware/authCheck");

router.get("/", getShop);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.route("/signup").get(getSignup);
router.post("/roles", postRole);
router.post("/signup", postSignup);
router.get(
  "/products/:prodId",
  authCheck(["basic", "vendor", "admin"]),
  getProduct
);
router.post("/logout", postLogout);
router.get("/add-product", authCheck(["vendor", "admin"]), getAddProduct);

router.post("/add-product", authCheck(["vendor", "admin"]), postAddProductPage);

module.exports = router;
