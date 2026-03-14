const express = require('express');
var router = express.Router()

const ArticlesModel = require('../models/articles.js');
const UserModel = require('../models/users.js');

// Display the editors page
router.get("/", async function(req, res)
{
  // Display both all articles and all user gables
  req.TPL.articles = await ArticlesModel.getAllArticles();
  req.TPL.users = await UserModel.getAllUsers();

  res.render("editors", req.TPL);
});

module.exports = router;
