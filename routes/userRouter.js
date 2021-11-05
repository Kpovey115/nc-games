const { getUser } = require('../controllers/app.controller');

const usersRouter = require('express').Router();

usersRouter.route('/:username').get(getUser);



module.exports = usersRouter;