module.exports = async (req, res, next) => {
  try {
    let auth = req.headers.authorization || `Bearer ${req.query.accesstoken}`;
    if (!auth || auth.search("Bearer ") !== 0) {
      return res.status(401).json({
        code: 401,
        message: "Unathorized",
      });
    }
    let token = auth.split(" ")[1];
    let user = {};

    user = sails.helpers.jwt.verify(token);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      code: 401,
      message: "Unathorized",
    });
  }
};
