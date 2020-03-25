//Express be used to handle GET, PUT, and POST and DELETE requests.
const express = require('express');
const router = express.Router();

/*  router.METHOD(PATH, HANDLER)
 1) router is an instance of the express module
 2) METHOD is an HTTP request method (GET, POST, PUT or DELETE)
 3) PATH is a path on the server.
 4) HANDLER is the function executed when the route is matched.
*/
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Places were undefinded. ',
        description: 'Please type /places/##',
        node: '## is Id-name of place you want'
    });
});


router.get('/:placeid', (req, res, next) => {
    res.status(200).json({
        place_Id: req.params.placeid,
        message: req.params.placeid + ' details'
    });
});

router.post('/:placeid', (req, res, next) => {
    res.status(405).json({
        Error: 'Method not allowed'
    });
});
router.put('/:placeid', (req, res, next) => {
    res.status(200).json({
        place_Id: req.params.placeid,
        message: req.params.placeid + ' were updated'
    });
});

router.delete('/:placeid', (req, res, next) => {
    res.status(200).json({
        place_Id: req.params.placeid,
        message: req.params.placeid + ' were deleted'
    });
});

module.exports = router;