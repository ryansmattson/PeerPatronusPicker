var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var config = {
  database: 'patronus_assigner',
  port: 5432
};

router.get('/patronuses', function(request, response){
  var client = new pg.Client(config);
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('SELECT * FROM patronus;', function(err, result){
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

module.exports = router;
