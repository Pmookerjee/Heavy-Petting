'use strict';

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }

  let count = 50;
  Pets.zip = '';
  let viewed = [], likes = [];

  Pets.requestPet = (zip, callback) => {
    Pets.all = [];
    
    $.getJSON(`https://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&count=` + count + `&offset=` + count + `&location=` + zip + `&callback=?`)
   .done(function(data) {
     console.log( 'API request successful');
     console.log(data);

     /*******IF THERE ARE NO OBJECTS FOR THAT ZIPCODE:********/
     if(!data.petfinder.pets) {
       $('#liAppend').append(`<img class="sadpanda" src="../assets/pngs/sadpanda.jpg"></img`)
       $('#liAppend').append(`<p class="sadpanda_text">Sorry, there are no nearby pets in that zipcode :(</p>`)
     } else {
     let length = data.petfinder.pets.pet.length;

     for (var i = 0; i < length; i++){
       let shortDescrip = 'No description available', photoPlaceholder = 'No Photo Available';
       if(data.petfinder.pets.pet[i].description['$t']) {
         shortDescrip = data.petfinder.pets.pet[i].description['$t'].replace(/\r?\n|\r/g, ', ').substr(0, 50);
       }
       if(data.petfinder.pets.pet[i].media.photos) {
         photoPlaceholder = data.petfinder.pets.pet[i].media.photos.photo[3]['$t'];
       }

      //  let fullZip = data.petfinder.pets.pet[0].contact.zip['$t'];
       Pets.zip = zip.substr(0,3);
       console.log('zipcode substr in requestPet is: ', Pets.zip);

       $.post('/pet', {
         id: data.petfinder.pets.pet[i].id['$t'].toString(),
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
     callback();
    }
   })
   .fail(function() {
     console.log( 'API request failed' );
   });
}

  Pets.fetchByZipcode = function(){
    $.get(`/pet/` + Pets.zip)
    .then(
      results => {
        console.log('In the fetchByZipcode ajax request')
        Pets.loadAll(results);
        if(localStorage.getItem('Viewed')!== null){
          Pets.all = Pets.filterOutViewedPets();
        }
        toDom.renderToCards();

        $("#tinderslide").jTinder();
      })
  };

  Pets.loadAll = rows => {
    Pets.all = rows.map(pet => new Pets(pet));
  };

 Pets.filterOutViewedPets =() => {
   var viewed = [];
    viewed = JSON.parse(localStorage.getItem('Viewed'));
    let filteredSet = Pets.all.filter(pet => {
      return (viewed.indexOf(pet.id) <0 );
    })
    return filteredSet;
 }
 
 Pets.saveViewed = (petID) => {
    if( localStorage.getItem('Viewed') !== null ){
          viewed = JSON.parse(localStorage.getItem('Viewed'));
      } else {
        viewed = [];
      }
      viewed.push(petID);
     localStorage.setItem('Viewed', JSON.stringify(viewed));
    }

	Pets.saveLike = (petObj) => {
    if( localStorage.getItem('Likes') !== null ){
          likes = JSON.parse(localStorage.getItem('Likes'));
      } else {
        likes = [];
      }
      likes.push(petObj);
     localStorage.setItem('Likes', JSON.stringify(likes));
   }

  module.Pets = Pets;
})(window);
