const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.username = decoded.username;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // res.status(401).json({ message: "Unauthorized" });
    next(new Error("Unauthorized"));
  }
};
module.exports = checkLogin;
