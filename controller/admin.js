const adminService = require("../service/admin");

class AdminController {
  async createAdmin(req, res, next) {
    try {
      const admin = await adminService.createAdmin(req.body.userId);
      res.json(admin);
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      const admin = await adminService.deleteAdmin(req.body.userId);
      res.json(admin);
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }
}

module.exports = new AdminController();
