var express = require('express');
var index = require('./routes/index');
var people = require('./routes/people');
var patronuses = require('./routes/patronuses')
var pg = require('pg');

var app = express();

app.use(express.static('public'));


app.use('/', index);
app.get('/people', people)
app.post('/people', people)
app.get('/patronuses', patronuses)
app.post('/patronuses', patronuses)

var server = app.listen(3000, handleServerStart);

function handleServerStart() {
  var port = server.address().port;
  console.log("Listening on port ", port);
}
