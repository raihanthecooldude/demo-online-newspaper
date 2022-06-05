const bcrypt = require("bcrypt");
const userService = require("../service/user");

class UserController {
  async signUp(req, res, next) {
    try {
      let user = await userService.getUserByEmail(req.body.email);
      if (user) {
        res.status(400).json("User Already Registered");
      } else {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        user = await userService.signUp(
          req.body.name,
          req.body.email,
          password
        );

        res.json(user);
      }
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await userService.login(req.body.email, req.body.password);
      if (!result) {
        res.status(400).json("Invalid email or password");
      } else {
        res.json(result);
      }
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async getAllUser(req, res, next) {
    const user = await userService.getAllUser();
    res.json(user);
  }
}

module.exports = new UserController();
