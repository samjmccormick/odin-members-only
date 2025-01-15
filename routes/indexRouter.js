const { Router } = require("express");
const indexRouter = Router();

//don't forget to import controllers
const {} = require("../controllers/indexController");

indexRouter.get("/", (req, res) => res.render("index"));

module.exports = indexRouter;
