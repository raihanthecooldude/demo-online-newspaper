const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const editor = require("../middleware/editor");

const UserController = require("../controller/user");
const AdminController = require("../controller/admin");
const EditorController = require("../controller/editor");
const ArticleController = require("../controller/article");

const express = require("express");
const Router = express.Router();

Router.post("/api/user/signup", UserController.signUp);
Router.post("/api/user/signin", UserController.login);
// Router.get("/api/user", UserController.getAllUser);

// Router.post("/api/admin", AdminController.createAdmin);
// Router.delete("/api/admin", AdminController.deleteAdmin);

Router.post("/api/editor", [auth, admin], EditorController.createEditor);
Router.delete("/api/editor", [auth, admin], EditorController.deleteEditor);

Router.post("/api/article", [auth, editor], ArticleController.createArticle);
Router.patch("/api/article/:id", [auth, editor], ArticleController.updateArticle);
Router.delete("/api/article/:id", [auth, editor], ArticleController.deleteArticle);
Router.get("/api/article", ArticleController.getAllArticle);
Router.get("/api/article/:id", ArticleController.getArticleById);

module.exports = Router;
