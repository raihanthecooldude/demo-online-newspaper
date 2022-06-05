const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
  async signUp(name, email, password) {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });

    return user;
  }

  async getAllUser() {
    try {
      const allUser = await prisma.user.findMany({
        orderBy: {
          id: "asc",
        },
      });
      return allUser;
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async getUserByName(name) {
    const user = await prisma.user.findMany({
      where: {
        name: name,
      },
    });

    return user;
  }

  async isUserEditor(id) {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        editor: {
          select: {
            id: true,
            activeStatus: true,
          },
        },
      },
    });
    return result;
  }

  async isUserAdmin(id) {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        admin: {
          select: {
            id: true,
          },
        },
      },
    });
    return result;
  }
}

module.exports = new UserModel();
