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

const conString = 'postgres://paulamookerjee@localhost:5432/pets';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

// app.get('*', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
// app.get('/petFinder/*', proxyPetFinder);
// app.get('/faves', (request, response) => response.sendFile('faves.html', {root: './public'}));
// app.get('/pet', (request, response) => response.sendFile('pet.html', {root: './public'}));

app.listen(PORT, function(){
  console.log('Server is running on port: ' + PORT);
});

loadDB();

app.get(`/pet/:zip`, function(request, response) {
  client.query(`
  SELECT * FROM animals
  WHERE zipcode LIKE $1 || '%' LIMIT 100;`,
  [ request.params.zip]
)
  .then(function(result) {
    console.log('successfully ran query - in the server')
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

app.post('/pet', function(request, response) {

  client.query(
    'INSERT INTO animals (id, animal, name, description, zipcode, photo, age, size, sex, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING;',
    [
      request.body.id,
      request.body.animal,
      request.body.name,
      request.body.description,
      request.body.zipcode,
      request.body.photo,
      request.body.age,
      request.body.size,
      request.body.sex,
      request.body.email
    ]
  )
  .then(function() {
    response.send('Successfully inserted into animals table')
  })
  .catch(function(err) {
    console.error(err);
  });
});

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
     animals (
      id VARCHAR(255),
      animal VARCHAR(255),
      breed VARCHAR(255),
      name VARCHAR (255),
      description VARCHAR (255),
      zipcode VARCHAR (255),
      photo VARCHAR (255),
      age VARCHAR (255),
      size VARCHAR (255),
      sex VARCHAR (255),
      email VARCHAR (255)
    );`
  )
  .then()
  .catch(console.error);

  // client.query(`
  //   CREATE TABLE IF NOT EXISTS
  //   zipcode (
  //     id INTEGER NOT NULL REFERENCES pets(zipcode_id),
  //     location VARCHAR(255) NOT NULL,
  //   );`
  // )
  // .then(loadZipcodes)
  // .catch(console.error);
}
