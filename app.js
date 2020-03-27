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
            title: "Location API",
            description: "Location API Information",
            contact: {
                name: "Thanh Binh"
            },
            servers: ["http://localhost:3000"]
        }
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
 *    description: Get respond in main page www.hosting.com/
 *    responses:
 *      '200':
 *        description: Hi there, please click into ' + req.hostname + '/location to check some HTTP request
 * /location:
 *  get:
 *    description: Get respond in .../location
 *    responses:
 *      '200':
 *        description: location were undefinded.
 * /location/{locationid}:
 *  get:
 *    description: Get respond in .../location/{locationid}
 *    responses:
 *      '200':
 *        description: Show location_id details
 *  post:
 *    description: Get respond in .../location/{locationid}
 *    responses:
 *      '405':
 *        description: Error 'Method not allowed'
 *  put:
 *    description: Get respond in .../location/{locationid}
 *    responses:
 *      '200':
 *        description: Show location_id were updated
 *  delete:
 *    description: Get respond in .../location/{locationid}
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
