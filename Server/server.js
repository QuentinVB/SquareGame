var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  
  bodyParser = require('body-parser');
  
//TODO : cleanup

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  next();
});


var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
  
app.listen(port);


console.log('square game RESTful API server started on: ' + port);