const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

// Tell the system that you want JSON to be used
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        // We are saying when a request comes in for all the requests, no matter which
        // method is invoked GET, PUT, POST or DELETE for the '/dishes' REST API endpoint
        // - When you call next() it will continue on to look for additional specifications
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
})
.get((req, res, next) => {
    res.end('Will send all the promotion to you!');
})
.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all the promotions!');
});

// promoID
promoRouter.route('/:promoId/')
.all((req, res, next) => {
    // We are saying when a request comes in for all the requests, no matter which
    // method is invoked GET, PUT, POST or DELETE for the '/dishes/dishId' REST API endpoint
    // - When you call next() it will continue on to look for additional specifications
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.promoId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.promoId);
});


// Export this module
module.exports = promoRouter;