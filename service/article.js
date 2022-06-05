const articleModel = require("../model/article");
const editorService = require("./editor");

class ArticleService {
  async createArticle(title, body, published, userId) {
    const editor = await editorService.getEditorByUserId(userId);
    const article = await articleModel.createArticle(
      title,
      body,
      published,
      editor.id
    );
    return article;
  }

  async updateArticle(articleId, title, body, published) {
    const article = await articleModel.updateArticle(
      articleId,
      title,
      body,
      published
    );
    return article;
  }

  async deleteArticle(id) {
    const article = await articleModel.deleteArticle(id);
    return article;
  }

  async getAllArticle() {
    const allArticle = await articleModel.getAllArticle();
    return allArticle;
  }

  async getArticleById(id) {
    const article = await articleModel.getArticleById(id);
    return article;
  }
}

module.exports = new ArticleService();
