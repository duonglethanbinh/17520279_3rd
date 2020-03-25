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
        message: 'Places were undefinded'
    });
});


router.get('/:placeId', (req, res, next) => {
    res.status(200).json({
        message: req.params.placeId + ' details',
        place_Id: req.params.placeId
    });
});

router.post('/:placeId', (req, res, next) => {
    res.status(200).json({
        message: req.params.placeId + ' were posted',
        place_Id: req.params.placeId
    });
});

router.delete('/:placeId', (req, res, next) => {
    res.status(200).json({
        message: req.params.placeId + ' were deleted',
        place_Id: req.params.placeId
    });
});

module.exports = router;