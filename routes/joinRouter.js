const { Router } = require("express");
const joinRouter = Router();
const bcrypt = require("bcryptjs");
const db = require("../db/queries.js");

joinRouter.get("/", (req, res) => res.render("join"));

joinRouter.post("/", async (req, res) => {
  console.log(res.locals.currentUser);
  await db.joinMembership(req.body.secretPassword, res);
  res.redirect("/posts");
});

module.exports = joinRouter;
