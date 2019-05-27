// Dependencies Connecting 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

//Port 
var PORT = process.env.PORT || 3000;


//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//CSS
app.use(express.static(path.join(__dirname, "app/public/CSS")));

//Router
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);


app.listen(PORT, function () {
    console.log('Running on PORT ' + PORT);
});
