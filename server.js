var express = require('express');
var index = require('./routes/index');
var pg = require('pg');

var app = express();

var config = {
  database: 'twittergenerator',
  port: 5432
};

app.use(express.static('public'));


app.use('/', index);

// app.get('/nouns', function(request, response){
//
//
//   var client = new pg.Client(config);
//   console.log(request);
//   client.connect(function(err){
//     if(err){
//       console.log('Connection error', err);
//     }
//     client.query('SELECT ...', function(err, rows){
//       if(err){
//         console.log('Query error', err);
//         response.sendStatus(500);
//       }else{
//         console.log('Here is the query response:', rows.rows)
//         response.send(rows.rows);
//       }
//
//       client.end(function(err){
//         if(err){
//           console.log('Disconnect error', err);
//         }
//       })
//
//     })
//   })
//
// });



var server = app.listen(3000, handleServerStart);

function handleServerStart() {
  var port = server.address().port;
  console.log("Listening on port ", port);
}
