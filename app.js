const express = require('express');
const app = express();
const morgan = require('morgan');
//morgan Logging middleware for node.js http apps.

const placeRoutes = require('./api/routes/places');

// Predefined Formats: default, short, tiny, dev
// dev - Concise output colored by response status for development use.
app.use(morgan('dev'));

//Routes which should handle request
app.use('/places', placeRoutes);
//Main page
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello world'
    }); 
  });

//Handel error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// Handle all kinds of errors
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    });
});

// module is a variable that represents current module
// exports is an object that will be exposed as a module
module.exports = app;