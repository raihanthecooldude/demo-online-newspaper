const editorService = require("../service/editor");

class EditorController {
  async createEditor(req, res, next) {
    try {
      const editor = await editorService.createEditor(req.body.userId);
      res.json(editor);
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async deleteEditor(req, res, next) {
    try {
      const editor = await editorService.deleteEditor(req.body.userId);
      res.json(editor);
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }
}

module.exports = new EditorController();
