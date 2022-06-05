const adminModel = require("../model/admin");

class AdminService {
  async createAdmin(userId) {
    const admin = await adminModel.createAdmin(userId);
    return admin;
  }

  async deleteAdmin(userId) {
    const admin = await adminModel.deleteAdmin(userId);
    return admin;
  }
}

module.exports = new AdminService();
