'use strict';

((module)=>{
  const filter = {};


    $('#submit').on('click', function(event) {
      event.preventDefault();
      let zip = $('#zip').val();
      if (/^[0-9]{5}$/.test(zip)) {
        $('#returnString').text('');
        console.log(zip);
        Pets.requestPet(zip, Pets.fetchByZipcode);
      } else {
        $('#returnString').text("Please enter a five digit zip code.").css("color","red")
      }
    })
  // got the zips
    module.filter = filter;
  })(window);
