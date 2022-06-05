const editorModel = require("../model/editor");
const activeStatus = require("../helper/enum/activeStatus");

class EditorService {
  async createEditor(userId) {
    let editor = await editorModel.getEditorByStatus();
    if (editor) {
      if (editor.userId == userId) {
        return "You are already an Editor";
      } else {
        return "There is already an Editor, kindly remove him first";
      }
    } else {
      let editor = await editorModel.getEditorByUserId(userId);
      if (editor) {
        editor = await editorModel.updateEditor(userId, activeStatus.ACTIVE);
      } else {
        editor = await editorModel.createEditor(userId);
      }
      return editor;
    }
  }

  async deleteEditor(userId) {
    const editor = await editorModel.updateEditor(
      userId,
      activeStatus.INACTIVE
    );
    return editor;
  }

  async getEditorByUserId(id) {
    const editor = await editorModel.getEditorByUserId(id);
    return editor;
  }
}

module.exports = new EditorService();
