
'use strict'

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }

  Pets.all = [];
  
  const requestPet = (zip) => {
  $.getJSON(`http://api.petfinder.com/pet.find?format=json&key=9aa57d3d06acb88bfca2fd92d0eedb34&output=basic&location=` + zip + `&callback=?`)
 .done(function(data) { console.log(data.petfinder.pets); })
 .error(function(err) { alert('Error retrieving data!'); });
}

  Pets.prototype.toHtml = function () {
    const template = Handlebars.compile($('#').text());
    return template(this);
  };

  Pets.prototype.insertRecord = function(callback) {
    $.post('#', {#})
    .then(console.log)
    .then(callback);
  };

module.Pets = Pets;
})(window);








