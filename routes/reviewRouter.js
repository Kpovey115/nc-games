const reviewRouter = require('express').Router();
const {getReviews, updateReview, getAllReviews, getComments} = require('../controllers/app.controller')

reviewRouter.route('/').get(getAllReviews)
reviewRouter.route('/:review_id').get(getReviews).patch(updateReview)
reviewRouter.route('/:review_id/comments').get(getComments)



module.exports = reviewRouter;