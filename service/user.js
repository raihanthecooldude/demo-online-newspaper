const bcrypt = require("bcrypt");
const userModel = require("../model/user");
const generateAuthToken = require("../helper/generateAuthToken");

class UserService {
  async signUp(name, email, password) {
    const user = await userModel.signUp(name, email, password);

    const token = generateAuthToken(user);
    return token;
  }

  async login(email, password) {
    try {
      let user = await userModel.getUserByEmail(email);
      if (!user) {
        return null;
      } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return null;
        } else {
          const token = generateAuthToken(user);
          return token;
        }
      }
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async getUserByEmail(email) {
    const user = await userModel.getUserByEmail(email);
    return user;
  }

  async getAllUser() {
    const user = await userModel.getAllUser();
    return user;
  }
}

module.exports = new UserService();
