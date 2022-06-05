const { PrismaClient } = require("@prisma/client");
const activeStatus = require("../helper/enum/activeStatus");
const prisma = new PrismaClient();

class EditorModel {
  async createEditor(userId) {
    const editor = await prisma.editor.create({
      data: {
        userId: userId,
        activeStatus: activeStatus.ACTIVE,
      },
    });

    return editor;
  }

  async updateEditor(userId, activeStatus) {
    const editor = await prisma.editor.update({
      where: {
        userId: userId,
      },
      data: {
        activeStatus: activeStatus,
      },
    });

    return editor;
  }

  async getEditorByUserId(userId) {
    const editor = await prisma.editor.findUnique({
      where: { userId: userId },
    });

    return editor;
  }

  async getEditorByStatus() {
    const editor = await prisma.editor.findFirst({
      where: { activeStatus: activeStatus.ACTIVE },
    });

    return editor;
  }
}

module.exports = new EditorModel();
