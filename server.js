"use strict"

const express = require('express');
const pg = require('pg');
const fs = require('fs');
const requestProxy = require('express-request-proxy');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const conString = 'postgres://paulamookerjee@localhost:5432/pets'; // TODO: Don't forget to set your own conString
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));


function requestPet() {

    $.get({
          url: 'http://api.petfinder.com/pet.get',
          type: 'GET',
          dataType: 'json',
          success: function() { alert('hello!'); },
          error: function() { alert('boo!'); },
          beforeSend: setHeader
        });
        function setHeader(xhr) {
        xhr.setRequestHeader('key', '9aa57d3d06acb88bfca2fd92d0eedb34');
      }

  };

  requestPet();



app.listen(PORT, function(){
  console.log('Server is running on port: ' + PORT);
});
