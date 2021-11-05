const apiRouter = require('express').Router();
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');
const reviewRouter = require('./reviewRouter')
const {getEndpoints} = require('../controllers/app.controller')


apiRouter.route('/').get(getEndpoints)

apiRouter.use('/categories', categoriesRouter)

apiRouter.use('/reviews', reviewRouter)

apiRouter.use('/comments', commentsRouter);


module.exports = apiRouter