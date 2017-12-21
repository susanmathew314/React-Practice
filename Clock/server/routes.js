var path = require('path');
module.exports = function(app){
	app.all("*", function(req,res,next){console.log(req.method + " request sent to " + req.path); next()})
	
	// app.get("", (req,res) => res.sendFile("../client/public/index.html") );
	app.get("", (req,res) => res.sendFile("../client/build/index.html") );
}
