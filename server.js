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



//
// function loadZipcodes() {
//   client.query('SELECT COUNT(*) FROM articles')
//   .then(result => {
//     if(!parseInt(result.rows[0].count)) {
//       fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
//         JSON.parse(fd.toString()).forEach(ele => {
//           client.query(`
//             INSERT INTO
//             articles(author_id, title, category, "publishedOn", body)
//             SELECT author_id, $1, $2, $3, $4
//             FROM authors
//             WHERE author=$5;
//           `,
//             [ele.title, ele.category, ele.publishedOn, ele.body, ele.author]
//           )
//           .catch(console.error);
//         })
//       })
//     }
//   })
// }

loadDB();


app.get('/pet/:zipcode', function(request, response) {
  client.query(`
  SELECT * FROM animals
  where zipcode = $1;`
)
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});


app.post('/pet', function(request, response) {

  client.query(
    'INSERT INTO animals (id, animal, name, description, zipcode, photo, age, size, sex) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING;',
    [
      request.body.id,
      request.body.animal,
      request.body.name,
      request.body.description,
      request.body.zipcode,
      request.body.photo,
      request.body.age,
      request.body.size,
      request.body.sex
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
      id INTEGER UNIQUE NOT NULL,
      animal VARCHAR(255),
      breed VARCHAR(255),
      name VARCHAR (255),
      description VARCHAR (255),
      zipcode VARCHAR (255),
      photo VARCHAR (255),
      age VARCHAR (255),
      size VARCHAR (255),
      sex VARCHAR (255)
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
