const categoriesRouter = require('express').Router();
const {getCategories} = require('../controllers/app.controller');



categoriesRouter.route("/").get(getCategories);



module.exports = categoriesRouter;