const config = require("config");
const jwt = require("jsonwebtoken");

function generateAuthToken(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.get("jwtPrivateKey")
  );

  return { jwt: token, id: user.id, email: user.email };
}

module.exports = generateAuthToken;
