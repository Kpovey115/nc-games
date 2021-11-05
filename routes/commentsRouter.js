const commentsRouter = require('express').Router()
const {deleteComment} = require('../controllers/app.controller')


commentsRouter.route('/:comment_id').delete(deleteComment)

module.exports = commentsRouter;