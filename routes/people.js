var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var config = {
  database: 'patronus_assigner',
  port: 5432
};
var client = new pg.Client(config);

router.get('/people', function(request, response){
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('SELECT concat(first_name, \' \', last_name) AS name FROM people;', function(err, result){
      var peopleList = {};
      peopleList = result.rows;
      if(err){
        // console.log('Query error', err);
        response.sendStatus(500);
      } else {
        // console.log('Great success', peopleList);
        response.send(peopleList);
      }

      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      });
    });
  });
});

app.post('/people', function(request, response){
  console.log(request.body);
  var firstName = request.body.first;
  var lastName = request.body.last;
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('INSERT INTO people (first_name, last_name) VALUES ($1, $2)', [firstName, lastName], function(err, rows){
      if(err){
        console.log('Query error', err);
        response.sendStatus(500);
      } else {
        console.log('Great success');
        response.sendStatus(200);
      }
      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })
    })
  })
});

module.exports = router;
