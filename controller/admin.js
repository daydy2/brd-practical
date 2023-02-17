const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

exports.getVendor = (req, res, next) => {
  User.find({ role: "vendor" })
    .then((user) => {
      
      if (!user) {
        return res.redirect("/");
      }
      return res.render("admin/usersPage", {
        pageTitle: "Vendors",
        vendor: user[0],
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
