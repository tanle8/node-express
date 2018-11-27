const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

// Tell the system that you want JSON to be used
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all the leaders!')
});

// leaderId
leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    // We are saying when a request comes in for all the requests, no matter which
    // method is invoked GET, PUT, POST or DELETE for the '/dishes/dishId' REST API endpoint
    // - When you call next() it will continue on to look for additional specifications
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operatioin not supported on /leaders/' + req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.params.leaderId);
})
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

// Export this module
module.exports = leaderRouter;