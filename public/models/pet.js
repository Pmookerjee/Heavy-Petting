'use strict';

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }



  Pets.prototype.requestPet = (zip) => {

    // Pets.all = [];
    var count = 4;

    $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&count=` + count + `&location=` + zip + `&callback=?`)
   .done(function(data) {
     console.log( 'API request successful ' );

     for (var i = 0; i < count; i++){
       $.post('/pet', {
         id: data.petfinder.pets.pet[i].id['$t'],
         animal: data.petfinder.pets.pet[i].animal['$t'],
         name: data.petfinder.pets.pet[i].name['$t'],
         description: data.petfinder.pets.pet[i].description['$t'].replace(/\r?\n|\r/g, ', ').substr(0, 100),
         zipcode: data.petfinder.pets.pet[i].contact.zip['$t'],
         photo: data.petfinder.pets.pet[i].media.photos.photo[3]['$t'],
         age: data.petfinder.pets.pet[i].age['$t'],
         size: data.petfinder.pets.pet[i].size['$t'],
         sex: data.petfinder.pets.pet[i].sex['$t']
       }, 'json');
     }
   })

  .fail(function() {
    console.log( 'API request failed' );
  });
  }


  Pets.prototype.toHtml = function () {
    const template = Handlebars.compile($('#').text());
    return template(this);
  };



  module.Pets = Pets;
})(window);
