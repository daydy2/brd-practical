const User = require("../model/user");
const Product = require("../model/product");
const Order = require("../model/order");

exports.getVendor = (req, res, next) => {
  User.find({ role: "vendor" })
    .then(user => {
        if(!user){
            return res.redirect('/')
        }
        return res.render('admin/usersPage',{
            pageTitle: 'Vendors',
            user: user
        })
    })
    .catch((err) => {
      console.log(err);
    });
};
