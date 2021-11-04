const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const {handleBadPath, badRequest, invalidInputType, handleServerError, handlesCustomErrors} = require('./controllers/err.controller');




app.use(express.json());

app.use('/api', apiRouter);



app.all('/*', handleBadPath)
app.use(invalidInputType)
app.use(handlesCustomErrors);


app.use(handleServerError);

module.exports = app;