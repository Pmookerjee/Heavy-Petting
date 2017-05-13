




const requestPet = (zip) => {
  $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&location=` + zip + `&callback=?`)
 .done(function(data) { console.log(data.petfinder.pets); })
 .error(function(err) { alert('Error retrieving data!'); });
}
