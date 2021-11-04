const reviewRouter = require('express').Router();
const {getReviews, updateReview, getAllReviews} = require('../controllers/app.controller')

reviewRouter.route('/').get(getAllReviews)
reviewRouter.route('/:review_id').get(getReviews).patch(updateReview)



module.exports = reviewRouter;