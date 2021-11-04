const db = require('../connection');
const format = require('pg-format');
const data = require('../data/development-data');

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
  .query('DROP TABLE IF EXISTS categories, users, reviews, comments')
  .then(() => {
    return db
    .query(`CREATE TABLE categories (
    slug VARCHAR PRIMARY KEY UNIQUE,
    description VARCHAR
    );`)
  })
  .then(() => {
    return db
    .query(`CREATE TABLE users (
      username VARCHAR(40) PRIMARY KEY UNIQUE,
      avatar_url VARCHAR,
      name VARCHAR
    );`)
  })
  .then(() => {
    return db
    .query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR,
      review_body VARCHAR,
      designer VARCHAR,
      review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR REFERENCES categories(slug),
      owner VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`)
    .then(() => {
      return db
      .query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body VARCHAR
      );`)
    })
  })
  .then(() => {
    const queryStr = format(`INSERT INTO categories
    (slug, description)
    VALUES %L RETURNING*;`, categoryData.map(item => [
      item.slug,
      item.description
    ]))

    return db.query(queryStr);
  })
  .then(({rows}) => {
      const queryStr = format(`INSERT INTO users
      (username, avatar_url, name)
      VALUES %L RETURNING*;`, userData.map(item => [
        item.username,
        item.avatar_url,
        item.name
      ]))
      return db.query(queryStr);
  })
  .then(({rows}) => {
    const queryStr = format(`INSERT INTO reviews
    ( title, review_body, designer, review_img_url, votes, category, owner, created_at)
    VALUES %L RETURNING*;`, reviewData.map(item => [
      
      item.title,
      item.review_body,
      item.designer,
      item.review_img_url,
      item.votes,
      item.category,
      item.owner,
      item.created_at
    ]))
    return db.query(queryStr);
  })
  .then(({rows}) => {
    
    const queryStr = format(`INSERT INTO comments
    (author, review_id, votes, created_at, body)
    VALUES %L RETURNING *;`, commentData.map(item => [
      item.author,
      item.review_id,
      item.votes,
      item.created_at,
      item.body
    ]))

    return db.query(queryStr);
  })
  
  


}; // end of seed function

module.exports = seed;
