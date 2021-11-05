# NC-GAMES-KPOVEY

## Why The Project Has Been Made 
In this repo is the BackEnd Project done at NorthCoders Bootcamp. It is designed to display and cement the backend programming skills I have gained in the space of 3 three weeks. I started this course with zero programming experience and this is a major milestone on my path to becoming a full stack developer. Any feed back is welcome and encouraged!

## Project Summary

This project is a server that host a database and has been hosted to a "Heroku" server so a user can interact with the data at various end points.

### End point summary

Below are the current working end points, please remember this project is still active and in progress, the readme will be updated accordingly.
Please start on  ```/api``` This will provide with more details on each endpoint in the form of a Json file.

```http

GET /api/categories
GET /api/reviews/:review_id
PATCH /api/reviews/:review_id
GET /api/reviews
GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments
DELETE /api/comments/:comment_id
GET 
```

## Project Data

Please see the projects Github Repo at: 
```
[Github Repo] => https://github.com/Kpovey115/nc-games.git
```
Please see where the project is being hosted at:
```
[Hosting at] => https://nc-games-kpovey.herokuapp.com/api
```

## How to clone and use the project

### Cloning

To clone this repo, click the green code button located to the top right of the central block, where the files are located.
Click copy URL.
Then open your terminal, find the directory where you wish to store the project and type the following command
```
git clone https://github.com/Kpovey115/nc-games
```

### Dependencies
This project makes use of the following dependencies (Please note the V stands for version):
```
dotenv: v10.0.0,
express: v4.17.1,
pg: v8.7.1,
pg-format: v1.0.4
node: 17.0.1,
PostgresSQL: v14.0

DEVELOPER DEPENDENCIES FOR TESTING FILES:
jest: v27.3.1,
jest-sorted: v1.0.12,
supertestL v6.1.6
```

please install them accordingly. The command ```npm install``` should install all the listed dependencies other than Node and PostgresSQL.


### Setting up database env
Once all dependencies are up, you need to set up your database so connection.js can use it. connection.js is currently set up to take two different variable environments (excluding production for the hosting). It is set up to take a test and development database.

to set these up, you need to ensure you have "dotenv" installed. Then make a file called:
``` .env.development``` then inside this file you need to write a single command. That command is ```PGDATABASE= <YOUR_DATABASE_HERE>``` repeat this for your test data base if you are going to use one.
Once this is done, add ```.env.*``` to your ```.gitignore``` file to ensure your private database details aren't also uploaded to git.

Once this is done you may run the script (all scripts located inside package.json file) setup-dbs to set up the database, you can do this with the following command
```
npm run setup-dbs
```

### Seeding
To seed the database that come with the repo run the following script:
```
npm run seed
```



## Enjoy!

Please enjoy this repo/project. I have had fun making it and growing my skill set, if you have any questions or suggestions on how I can improve them, feel free to to leave a comment!
