const express = require("express");
const router = express.Router();
const {
  getShop,
  postRole,
  getProduct,
  getAddProduct,
  postAddProductPage,
  getEditPage,
  postEdit,
} = require("../controller/shop");
const { authCheck } = require("../middleware/authCheck");
const {
  getVendor,
  getUsers,
  getDeleteUser,
  getDeleteProduct,
} = require("../controller/admin");
const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  postLogout,
} = require("../controller/auth");

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
router.get(
  "/delete-product/:productId",
  authCheck(["admin"]),
  getDeleteProduct
);
router.get(
  "/edit-product/:productId",
  authCheck(["vendor", "admin"]),
  getEditPage
);
router.post("/edit-product", authCheck(["vendor", "admin"]), postEdit);

module.exports = router;
