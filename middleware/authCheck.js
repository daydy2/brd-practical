exports.authCheck = (permission) => {
  return (req, res, next) => {
    const role = req.user.role;
    console.log("authCheck role is:" + role);
    if (permission.includes(role)) {
      next();
    } else {
      res.status(401).redirect("/");
    }
  };
};
