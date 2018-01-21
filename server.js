var express = require('express');
var app = express();
var fs = require("fs");
var PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/currentAffair.json', function (req, res) {
   res.sendFile( __dirname + "/" + "currentAffair.json" );
})

app.get('/process_get', function (req, res) {

   var configFile = fs.readFileSync('./currentAffair.json');
   var config = JSON.parse(configFile);
   config.data.push({
     topic: req.query.topic,
     content: req.query.content
   });
   var configJSON = JSON.stringify(config);
   fs.writeFileSync('./currentAffair.json', configJSON);

   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/listca', function (req, res) {
   fs.readFile( __dirname + "/" + "currentAffair.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
