'use strict';

((module)=>{
  const filter = {};


  $('#submit').on('click', function(event) {
    event.preventDefault();
    Pets.zip = $('#zip').val();
    if (/^[0-9]{5}$/.test(Pets.zip)) {
      $('#returnString').text(' ');
      console.log(Pets.zip);
      Pets.requestPet(Pets.fetchByZipcode);

      page('/pet');

      $('ul').children().remove();
    } else {
      $('#returnString').text("Please enter a five digit zip code.").css("color","red")
    }
  })
  

  // got the zips
  module.filter = filter;
})(window);
