const apiRouter = require('express').Router();
const categoriesRouter = require('./categoriesRouter')
const reviewRouter = require('./reviewRouter')




apiRouter.use('/categories', categoriesRouter)

apiRouter.use('/reviews', reviewRouter)

module.exports = apiRouter