const userModel = require("../model/user");

async function admin(req, res, next) {
  //   console.log(req.user);
  const result = await userModel.isUserAdmin(req.user.id);
  //   console.log(result);
  if (!result.admin || !result.admin.id) {
    return res.status(403).json("Access Denied");
  }

  next();
}

module.exports = admin;
