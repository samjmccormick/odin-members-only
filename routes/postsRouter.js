const { Router } = require("express");
const postsRouter = Router();
const db = require("../db/queries.js");

postsRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("posts/posts", { messages: messages });
});

postsRouter.get("/new", (req, res) => res.render("posts/newPost"));

postsRouter.post("/new", async (req, res) => {
  await db.postNewPost(req.body.text, res.locals.currentUser);
  const messages = await db.getAllMessages();
  res.render("posts/posts", { messages: messages });
});

module.exports = postsRouter;
