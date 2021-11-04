
const {fetchCategories, fetchReviews, changeReview, fetchAllReviews} = require('../models/app.models');



exports.getCategories = (req, res, next) => {
    fetchCategories()
    .then((body) => {
        res.status(200).send(body);
    })
    .catch(err => {
        next(err)
    })
}

exports.getReviews = (req, res, next) => {
    
    const {review_id} = req.params;
    
    fetchReviews(review_id)
    .then((data) => {
        res.status(200).send({data})
    })
    .catch(err => {
        next(err);
    })
}

exports.getAllReviews = (req, res, next) => {
    
    const {sort_by, order, category} = req.query;
    
    
    
    fetchAllReviews(sort_by, order, category)
    .then(data => {
        res.status(200).send({data});
    })
    .catch(err => {
        next(err);
    })
}

exports.updateReview = (req, res, next) => {
    const {body} = req
    const {review_id} = req.params
    

    changeReview(review_id, body)
    .then((rows)=> {
        res.status(202).send({rows});
    })
    .catch(err => {
        next(err);
    })
}