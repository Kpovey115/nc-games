
const {fetchCategories, fetchReviews, changeReview, fetchAllReviews, fetchComments, makeNewComment, removeComment} = require('../models/app.models');
const endpoints = require('../endpoints.json');


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

exports.getComments = (req, res, next) => {
    const {review_id} = req.params;
    
    
    fetchComments(review_id)
    .then(data => {
        res.status(200).send({data})
    })
    .catch(err => {
        next(err);
    })
}

exports.newComment = (req, res, next) => {
    const {body} = req;
    const {review_id} = req.params;
    

    makeNewComment(body, review_id)
    .then((data) => {
        res.status(201).send({data})
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteComment = (req, res, next) => {
    
    const {comment_id} = req.params;
    


    removeComment(comment_id)
    .then(data => {
       // console.log(data);
        res.status(204).send({data});
    })
    .catch(err => {
        next(err);
    })
}

exports.getEndpoints = (req, res, next) => {
    res.status(200).send({data: endpoints});
}