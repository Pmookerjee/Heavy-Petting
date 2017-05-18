'use strict';

((module)=>{
  const filter = {};


  $('#submit').on('click', function(event) {
    event.preventDefault();
    let zip = $('#zip').val();
    if (/^[0-9]{5}$/.test(zip)) {
      $('#returnString').text('_').css('color','rgb(046, 134, 171)');
      console.log(zip);
      Pets.requestPet(zip, Pets.fetchByZipcode);
      page('/pet');
      $('ul').children().remove();
      $( '#filterForm' ).each(function(){
        this.reset();
      });
    } else {
      $('#returnString').text('Please enter a five digit zip code.').css('color','red')
    }
  })


  // got the zips
  module.filter = filter;
})(window);
