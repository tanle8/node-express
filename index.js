// When we declare express variable here, we saying that this
// Express module is required, the it will automatically included
// from the node_modules folder into our application.
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Router
const dishRouter = require('./router/dishRouter');
const promoRouter = require('./router/promoRouter');
const leaderRouter = require('./router/leaderRouter');

const hostname = 'localhost';
const port = 3000;

// 1. Declare that we will use Express node module to construct
//    our web server.
// We're saying that our application is going to use the express
// node module. So once we say that, then Express provides a bunch
// of methods that we can use to construct our web server
const app = express();
// Whenever we need to use a middle-ware, we say app.use()
app.use(morgan('dev'));
// This allows us to parse the body of the request message
app.use(bodyParser.json());

// Mount that router at an endpoint. We will mount a router like below:
// - The first parameter is the API endpoint
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


// We tell Express to serve up the static files from `__dirname` - the
// root folder of the project
app.use(express.static(__dirname + '/public'));

// 2. Setup the server using app.use()
// Inside app.use(), we will declare a function that will be called
// to setup our server. This function takes three parameters:
// - req ~ request
// - res ~ response
// - next - the next will be used when you need to invoke additional
//          middleware tp take care of work on your behalf
app.use((req, res, next) => {
    // We don't need to console.log(req.headers) since morgan will log
    // sufficiently information for us.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// 3. Create the server
// This createServer will take app as a parameter.
const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
