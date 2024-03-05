//importing jsonwebtoken package for generating token
const jwt = require("jsonwebtoken");
//defining a function that is responsible for generating a JWT
function generateToken() {
  //defines a payload object that will be encoded into the JWT
  const payload = {
    app: mediaApp,
  };
  //jsonwebtoken libraries sign method, takes three arguments: payload , secret key and expire time
  return jwt.sign(payload, "my_secret_key", { expiresIn: "1h" });
}

module.exports = { generateToken };
