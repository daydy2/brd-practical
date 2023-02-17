const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

exports.getUsers = (req, res, next) => {
  const role = req.params.role;
  User.find({ role: role })
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      return res.render("admin/usersPage", {
        pageTitle: role,
        vendor: user,
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getDeleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.deleteOne({ _id: userId })
    .then(() => {
      console.log("DELETE ACTION OCCURED");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .then(() => {
      console.log("DELETE ACTION OCCURED - PRODUCT");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
