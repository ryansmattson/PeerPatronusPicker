var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var config = {
  database: 'patronus_assigner',
  port: 5432
};

router.get('/people', function(request, response){
  var client = new pg.Client(config);
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

router.post('/people', function(request, response){
  
})

module.exports = router;
