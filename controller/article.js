const articleService = require("../service/article");

class ArticleController {
  async createArticle(req, res, next) {
    // console.log(req.user);
    try {
      const article = await articleService.createArticle(
        req.body.title,
        req.body.body,
        req.body.published,
        req.user.id
      );
      res.json(article);
    } catch (err) {
      // console.error(err);
      if (err.code == "P2003") {
        res.status(400).json("There is no Editor with this ID");
      } else {
        res.status(400).json(err);
      }
    }
  }

  async updateArticle(req, res, next) {
    try {
      const article = await articleService.updateArticle(
        req.params.id,
        req.body.title,
        req.body.body,
        req.body.published
      );

      if (article > 0) {
        res.json(article);
      } else {
        res.status(404).json("There is no article with this ID");
      }
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async deleteArticle(req, res, next) {
    try {
      const article = await articleService.deleteArticle(req.params.id);
      if (article > 0) {
        res.json(article);
      } else {
        res.status(404).json("There is no article with this ID");
      }
    } catch (err) {
      // console.error(err);
      res.status(400).json(err);
    }
  }

  async getAllArticle(req, res, next) {
    const allArticle = await articleService.getAllArticle();
    res.json(allArticle);
  }

  async getArticleById(req, res, next) {
    const article = await articleService.getArticleById(
      parseInt(req.params.id)
    );
    res.json(article);
  }
}

module.exports = new ArticleController();
