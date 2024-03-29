var port = 8888;

var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./client/build")));

app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');

require('./server/routes')(app);

app.listen(port, function() {
 console.log("listening on port ", port);
});
