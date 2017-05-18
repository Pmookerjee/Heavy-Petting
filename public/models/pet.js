'use strict';

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }

  let count = 50;
  Pets.zip = '';
  let viewed = [], likes = [], dislikes = [];

  Pets.requestPet = (zip, callback) => {
    Pets.all = [];

    $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&count=` + count + `&offset=` + count + `&location=` + zip + `&callback=?`)
   .done(function(data) {
     console.log( 'API request successful');
     console.log(data);

     if(!data.petfinder.pets) {  // Do something
     }
     let length = data.petfinder.pets.pet.length;

     for (var i = 0; i < length; i++){
       let shortDescrip = 'No description available', photoPlaceholder = 'No Photo Available';
       if(data.petfinder.pets.pet[i].description['$t']) {
         shortDescrip = data.petfinder.pets.pet[i].description['$t'].replace(/\r?\n|\r/g, ', ').substr(0, 50);
       }
       if(data.petfinder.pets.pet[i].media.photos) {
         photoPlaceholder = data.petfinder.pets.pet[i].media.photos.photo[3]['$t'];
       }

       let fullZip = data.petfinder.pets.pet[0].contact.zip['$t'];
       Pets.zip = fullZip.substr(0,3);
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
        Pets.loadLSBuffers();
        // Pets.filterOutViewedPets();
        toDom.renderToCards();
        $("#tinderslide").jTinder();
      }
    )
  };

  Pets.loadAll = rows => {
    Pets.all = rows.map(pet => new Pets(pet));
  };

  Pets.loadLSBuffers = () => {
    if(localStorage.getItem('Dislikes')) {
      dislikes.push(localStorage.getItem('Dislikes'));
    }
    if(localStorage.getItem('Likes')){
      likes.push(localStorage.getItem('Likes'));
    }
    if(localStorage.getItem('Viewed')) {
      viewed.push(localStorage.getItem('Viewed'));
    }
  }

  Pets.saveDislike = (petId) => {
		dislikes.push(petId[0].id);
    viewed.push(petId[0].id);
		localStorage.setItem('Dislikes', dislikes);
    localStorage.setItem('Viewed', viewed)
 	}

	Pets.saveLike = (petId) => {
			likes.push(petId[0].id);
      viewed.push(petId[0].id);
			localStorage.setItem('Likes', likes);
      localStorage.setItem('Viewed', viewed);
	}

  Pets.filterOutViewedPets = () => {
    let viewed = [];
    viewed.push(localStorage.getItem('Viewed'));
      //Need to add filter function here...
  }

  Pets.prototype.toHtml = function () {
    const template = Handlebars.compile($('#').text());
    return template(this);
  };

  module.Pets = Pets;
})(window);
