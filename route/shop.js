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
  getEditPage,
} = require("../controller/shop");
const { authCheck } = require("../middleware/authCheck");
const { getVendor, getUsers, getDeleteUser, getDeleteProduct } = require("../controller/admin");

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
router.get("/user/:role", authCheck(["admin"]), getUsers);
router.get("/delete-user/:userId", authCheck(["admin"]), getDeleteUser);
router.get("/delete-product/:productId", authCheck(["admin"]), getDeleteProduct);
router.get('/edit-product/:productId', getEditPage)

module.exports = router;
