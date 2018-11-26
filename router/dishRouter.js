const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// We need to mount to this expressRouter in my index.js file
// So, In index.js, we will mount this Express router / (slash)
// dishes endpoint.
// ---
// This group is one single unit implemented by using the dishRouter
// on this particular router.
dishRouter.route('/')
    .all((req, res, next) => {
    // We are saying when a request comes in for all the requests, no matter which
    // method is invoked GET, PUT, POST or DELETE for the '/dishes' REST API endpoint
    // - When you call next() it will continue on to look for additional specifications
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all the dishes!');
});

// dishId
dishRouter.route('/:dishId/')
.all((req, res, next) => {
    // We are saying when a request comes in for all the requests, no matter which
    // method is invoked GET, PUT, POST or DELETE for the '/dishes/dishId' REST API endpoint
    // - When you call next() it will continue on to look for additional specifications
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the dishes: ' + req.params.dishId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});


// Export this module
module.exports = dishRouter;