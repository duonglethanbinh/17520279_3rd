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
        message: 'location were undefinded.',
    });
});


router.get('/:locationid', (req, res, next) => {
    res.status(200).json({
        location_id: req.params.locationid,
        message: req.params.locationid + ' details'
    });
});

router.post('/:locationid', (req, res, next) => {
    res.status(405).json({
        Error: 'Method not allowed'
    });
});
router.put('/:locationid', (req, res, next) => {
    res.status(200).json({
        location_id: req.params.locationid,
        message: req.params.locationid + ' were updated'
    });
});

router.delete('/:locationid', (req, res, next) => {
    res.status(200).json({
        location_id: req.params.locationid,
        message: req.params.locationid + ' were deleted'
    });
});
module.exports = router;