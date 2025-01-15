const { Router } = require("express");
const signupRouter = Router();
const bcrypt = require("bcryptjs");
const db = require("../db/queries.js");

signupRouter.get("/", (req, res) => res.render("sign-up-form"));

signupRouter.post("/", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      alert("error in hashing");
    } else {
      try {
        await db.addUser(req.body, hashedPassword);
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  });
});

module.exports = signupRouter;
