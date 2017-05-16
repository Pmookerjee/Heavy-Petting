'use strict';

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }


  Pets.all = [];
  let count = 50;

  Pets.requestPet = (zip) => {
    $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&count=` + count + `&offset=` + count + `&location=` + zip + `&callback=?`)
   .done(function(data) {
     console.log( 'API request successful ' );
     console.log(data);
     let length = data.petfinder.pets.pet.length;

     for (var i = 0; i < length; i++){
       let shortDescrip = 'No description available', photoPlaceholder = 'No Photo Available';
       if(data.petfinder.pets.pet[i].description['$t']) {
         shortDescrip = data.petfinder.pets.pet[i].description['$t'].replace(/\r?\n|\r/g, ', ').substr(0, 50);
       }
       if(data.petfinder.pets.pet[i].media.photos) {
         photoPlaceholder = data.petfinder.pets.pet[i].media.photos.photo[3]['$t'];
       }

       $.post('/pet', {
         id: data.petfinder.pets.pet[i].id['$t'],
         animal: data.petfinder.pets.pet[i].animal['$t'],
         name: data.petfinder.pets.pet[i].name['$t'],
         description: shortDescrip,
         zipcode: data.petfinder.pets.pet[i].contact.zip['$t'],
         photo: photoPlaceholder,
         age: data.petfinder.pets.pet[i].age['$t'],
         size: data.petfinder.pets.pet[i].size['$t'],
         sex: data.petfinder.pets.pet[i].sex['$t'],
         email: data.petfinder.pets.pet[i].contact.email['$t']
       }, 'json');
     }
   })
  .fail(function() {
    console.log( 'API request failed' );
  });
  }


  Pets.fetchByZipcode = function(zip, callback){
    $.get(`/pet/` + zip)
    .then(
      results => {

        console.log('In the fetchByZipcode ajax request')
        Pets.loadAll(results);
      }
    )
    .then(callback)
  };

  Pets.loadAll = rows => {
    Pets.all = rows.map(pet => new Pets(pet));
  };

  Pets.saveFaves = faves => {


  }

  Pets.all = [];

  Pets.prototype.requestPet = (zip) => {
  $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&location=` + zip + `&callback=?`)
 .done(function(data) { console.log(data.petfinder.pets); })
 .error(function(err) { alert('Error retrieving data!'); });
}

  Pets.prototype.toHtml = function () {
    const template = Handlebars.compile($('#').text());
    return template(this);
  };

module.Pets = Pets;
})(window);
