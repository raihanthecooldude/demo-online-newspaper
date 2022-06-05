const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AdminModel {
  async createAdmin(userId) {
    const admin = await prisma.admin.create({
      data: {
        userId: userId,
      },
    });

    return admin;
  }

  async deleteAdmin(userId) {
    const admin = await prisma.admin.delete({
      where: {
        userId: userId,
      },
    });

    return admin;
  }
}

module.exports = new AdminModel();
