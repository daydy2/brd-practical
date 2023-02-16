const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

exports.getShop = (req, res, next) => {
  console.log(req.user)
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
    role: false,
  });
};
exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  User.find({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/signup");
      }

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role.toLowerCase(),
          });
          const accessToken = jwt.sign(
            {
              userId: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          newUser.accessToken = accessToken;
          return newUser.save();
        })
        .then((result) => {
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postRole = (req, res, next) => {
  const role = req.body.roles;
  // console.log(req.body.roles);

  res.render("auth/signup", {
    pageTitle: "Signup",
    role: role ? role : false,
  });
};
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
  });
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (!doMatch) {
            return res.redirect("/login");
          }
          req.session.isLoggedIn = true;
          req.session.user = user;

          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          user.accessToken = accessToken
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findById(prodId).then(product => {
    if(!product){
      return res.redirect('/');
    }
  //  console.log(product)
    res.render('shop/product-detail',{
      pageTitle: 'Product Detail',
      product: product 
    })
  }).catch(err => {
    console.log(err)
  })
}
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
}