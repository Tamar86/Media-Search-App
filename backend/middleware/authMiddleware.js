//importing jsonwebtoken package
const jwt = require("jsonwebtoken");
//middleware function  
function authMiddleware(req, res, next) {
  //extracts the value of authorization header from incoming HTTP request
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing token",
    });
  }
  next();
}

module.exports = authMiddleware;
