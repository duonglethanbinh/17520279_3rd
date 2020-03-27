const express = require('express');
const app = express();//morgan logging middleware for node.js http apps.
const morgan = require('morgan');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const placeRoutes = require('./api/routes/location');
// Predefined Formats: default, short, tiny, dev 
// dev - Concise output colored by response status for development use.
//Routes which should handle request
app.use(morgan('dev'));
app.use('/location', placeRoutes);
//Main page
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hi there, please click into ' + req.hostname + '/location to check some HTTP request'
    });
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: "This is an Api docs about Assignment Third Week: <strong>Create a Restful API server using Node JS</strong> <br>We try to get locationAPI information <br>There are some instructions: <ul> <li> Using Nodejs + express to make a restful api server (just simple API, don't need to connect database or do some complicated processes)</li><li> Handle the source code using github</li><li> Using postman to test api </li><li>Using API Doc to generate the API document for API (Student also can use swagger) </li><li>Link the github to heroku to deploy the API to cloud.</li></ul>",
            version: "1.0.0",
            title: "Location API",
            contact: {
                email: "17520279@gm.uit.edu.vn",
                name: "Duong Le Thanh Binh"
            }
        },
        host: 'localhost:3000', // Host (optional)
        basePath: '/', // Base path (optional)
    },
    // Path to the API docs
    apis: ["app.js"]
};

// // Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//Routes
/**
 * @swagger
 * /:
 *  get:
 *    tags: [/]
 *    summary: Returns main page status
 *    description: Get response in main page url/
 *    responses:
 *      '200':
 *        description: Hi there, please click into ' + req.hostname + '/location to check some HTTP request
 * /location:
 *  get:
 *    tags: [location]
 *    summary: Return a list of all location
 *    description: Get response in url/location
 *    responses:
 *      '200':
 *        description: List of all location
 *  post:
 *    tags: [location]
 *    summary: Create a new location
 *    description: Get response in url/location
 *    responses:
 *      '200':
 *        description: Create a new location
 *  put:
 *    tags: [location]
 *    summary: Bulk update of location
 *    description: Get response in url/location
 *    responses:
 *      '200':
 *        description: Bulk update of location
 *  delete:
 *    tags: [location]
 *    summary: Delete all of location
 *    description: Get response in url/location
 *    responses:
 *      '200':
 *        description: Delete all of location
 * /location/{locationid}:
 *  get:
 *    tags: [location]
 *    summary: Returns a specific location
 *    description: Get response in rul/location/{locationid}
 *    responses:
 *      '200':
 *        description: Show location_id details
 *  post:
 *    tags: [location]
 *    summary: Returns POST location_id status
 *    description: Get response in .../location/{locationid}
 *    responses:
 *      '405':
 *        description: Method not allowed (405)
 *  put:
 *    tags: [location]
 *    summary: Updates a specific location
 *    description: Get response in .../location/{locationid}
 *    responses:
 *      '200':
 *        description: Show location_id were updated
 *  delete:
 *    tags: [location]
 *    summary: Delete a specific location
 *    description: Get response in .../location/{locationid}
 *    responses:
 *      '200':
 *        description: Show location_id were deleted
 */


//Handel error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// Handle all kinds of errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// module is a variable that represents current module, exports is an object that will be exposed as a module
module.exports = app;
