const reviewRouter = require('express').Router();
const {getReviews, updateReview, getAllReviews, getComments, newComment} = require('../controllers/app.controller')

reviewRouter.route('/').get(getAllReviews)
reviewRouter.route('/:review_id').get(getReviews).patch(updateReview)
reviewRouter.route('/:review_id/comments').get(getComments).post(newComment)



module.exports = reviewRouter; 