const db = require('../db/connection')


exports.fetchCategories = () => {

    return db.query('SELECT * FROM categories')
    .then(({rows}) => {
        return rows;
    })
}


exports.fetchReviews = (id) => {
    
    
    const queryStr = `SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = ($1)
    GROUP BY reviews.review_id`
    
    // 'SELECT * FROM reviews WHERE review_id = ($1)'
    return db
    .query(queryStr, [id])
    .then(({rows}) => {
        
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Incorrect request'})
        }


        return rows;
    })
}

exports.fetchAllReviews = (sort_by = 'owner', order = "DESC", category ) => {
    
    
    if(!['title', 'designer', 'owner', 'review_id', 'category', 'created_at', 'votes', 'comments.review_id', 'review_body', 'review_img_url'].includes(sort_by))
    {
        return Promise.reject({status: 400, msg: 'Incorrect option'});
    } else if (!['ASC', 'DESC'].includes(order)) {
        return Promise.reject({status: 400, msg: 'Incorrect option'});
    }


    let queryStr = `SELECT reviews.*, COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments 
    ON reviews.review_id = comments.review_id
    ` 
    if (category !== undefined){
        queryStr += `WHERE reviews.category = '${category}'`
    }
   queryStr += `
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}`;
    

    return db.query(queryStr)
    .then(({rows}) => {
        if(rows.length ===0){
            return Promise.reject({status:400, msg: 'Invalid option'})
        }
        return rows;
    })
}


exports.changeReview = (id, object) => {
    
    if(object.updated_votes === undefined || typeof object.updated_votes !== 'number'){
        return Promise.reject({status: 404, msg: 'Invalid update'});
    }
    

    return db.query(`SELECT * FROM reviews WHERE review_id = $1`, [id])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Invalid update'})
        }
        let votes = rows[0].votes;
        const {updated_votes} = object;
        const newVotes = votes + updated_votes;
        return db.query(`UPDATE reviews
        SET 
        votes = ($1)
        WHERE review_id = ($2)
        RETURNING*;`,[newVotes,id])
    })
    .then(({rows}) => {
        return rows;
    })
}