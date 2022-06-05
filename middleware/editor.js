const userModel = require("../model/user");

async function editor(req, res, next) {
  //   console.log(req.user);
  const result = await userModel.isUserEditor(req.user.id);
  //   console.log(result);
  if (
    !result.editor ||
    !result.editor.id ||
    result.editor.activeStatus !== "ACTIVE"
  ) {
    return res.status(403).json("Access Denied");
  }

  next();
}

module.exports = editor;
