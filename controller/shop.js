const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.getShop = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.render("shop/shop", {
        pageTitle: "Shop",
        prods: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    role: false
  });
};
exports.postSignup = (req, res, next) => {
  
};
exports.postRole = (req, res, next) => {
  // const role = req.body.role-select;
  
  // res.render("auth/signup", {
  //   pageTitle: "Signup",
  //   role: role ? role : false,
  // });
  console.log(req.body)
};
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
  });
};
// exports.postLogin = (req, res, next) => {
//         res.render('auth/login', {
//             pageTitle: 'Login',
//         })
// }
