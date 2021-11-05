const apiRouter = require('express').Router();
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');
const reviewRouter = require('./reviewRouter')
const {getEndpoints} = require('../controllers/app.controller');
const usersRouter = require('./userRouter');


apiRouter.route('/').get(getEndpoints);

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/reviews', reviewRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);


module.exports = apiRouter