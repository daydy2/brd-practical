exports.authCheck = (permission) => {
  return (req, res, next) => {
    const role = req.user.role;
    console.log("authCheck role is:" + role);
    if (permission.includes(role)) {
      next();
    } else {
      res.status(401).render('auth/unauth',{
        pageTitle: "Error 401",
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user ? req.session.user : false,
      })
    }
  };
};
