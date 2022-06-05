const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ArticleModel {
  async createArticle(title, body, published, editorId) {
    const article = await prisma.article.create({
      data: {
        title: title,
        body: body,
        published: published,
        editorId: editorId,
      },
    });

    return article;
  }

  async updateArticle(articleId, title, body, published) {
    const result =
      await prisma.$executeRaw`UPDATE article SET title=IF(${title} IS NOT NULL, ${title}, title), body=IF(${body} IS NOT NULL, ${body}, body), published=IF(${published} IS NOT NULL, ${published}, published) WHERE id=${articleId}`;

    return result;
  }

  async deleteArticle(id) {
    const article =
      await prisma.$executeRaw`DELETE from article where id = ${id}`;

    return article;
  }

  async getAllArticle() {
    try {
      const allArticle = await prisma.article.findMany({
        where: { published: true },
        orderBy: {
          id: "desc",
        },
        select: {
          id: true,
          title: true,
          body: true,
          published: true,
          editorId: true,
          editor: {
            select: {
              user: {
                select: { id: true, name: true },
              },
            },
          },
          createdAt: true,
        },
      });
      return allArticle;
    } catch (err) {
      throw err;
    }
  }

  async getArticleById(id) {
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        body: true,
        published: true,
        editorId: true,
        editor: {
          select: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
        createdAt: true,
      },
    });

    return article;
  }
}

module.exports = new ArticleModel();
