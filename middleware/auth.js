const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const bearer =
    req.header("x-auth-token") ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (!bearer) {
    return res.status(401).json("Access Denied. No Token Provided");
  } else {
    const tokens = bearer.split(" ");
    const token = tokens[1];
    //   console.log(token);
    if (!token) {
      return res.status(401).json("Access Denied. No Token Provided");
    }
    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      // console.log(decoded);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json("Invalid token");
    }
  }
}

module.exports = auth;
