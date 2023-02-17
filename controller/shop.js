const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

exports.getShop = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.render("shop/shop", {
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
exports.getAddProduct = (req, res, next) => {
  res.render("edit/add-product", {
    pageTitle: "Add Product",
    isAuthenticated: req.session.isLoggedIn,
    user: req.session.user ? req.session.user : false,
    editMode: false,
    product: false,
  });
};
exports.postAddProductPage = (req, res, next) => {
  const { title, price, imgUrl, description, userId } = req.body;

  const newProduct = new Product({
    title: title.toLowerCase(),
    price: price.toLowerCase(),
    imgUrl: imgUrl.toLowerCase(),
    description: description.toLowerCase(),
    userId: userId,
  });
  newProduct.save();
  return res.redirect("/");
};
exports.getEditPage = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect(`/products/${productId}`);
      }
      return res.render("edit/add-product", {
        pageTitle: "Edit Product",
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
        product: product,
        editMode: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEdit = (req, res, next) => {
  const {
    title,
    price,
    imgUrl,
    description,
    userId,
    productId,
  } = req.body;
  
  
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      // console.log(product)
      product.title = title;
      product.price = price;
      product.imgUrl = imgUrl;
      product.description = description;
      product.userId = userId;
      return product.save().then(() => {
        console.log(`${title} is up to date`);
        res.redirect("/");
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
