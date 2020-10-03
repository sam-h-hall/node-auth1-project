module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log(req.session);
    next();
  } else {
    res.status(401).json({
      message: "Please log in"
    });
  };
};