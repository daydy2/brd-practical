const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

exports.getShop = (req, res, next) => {
  
  Product.find()
    .then((product) => {
      res.status(200).render("../views/shop/shop.ejs", {
        pageTitle: "Shop",
        prods: product,
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRole = (req, res, next) => {
  const role = req.body.roles;

  res.render("auth/signup", {
    pageTitle: "Signup",
    role: role ? role : false,
    isAuthenticated: req.session.isLoggedIn,
    user: req.session.user ? req.session.user : false,
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      //  console.log(product)
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        product: product,
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
