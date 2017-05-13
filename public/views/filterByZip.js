'use strict';

((module)=>{
  const filter = {};

  filter.getZip = (event) => {
    $('#submit').on('click', function(event) {
      event.preventDefault();
      if (/^[0-9]{5}$/.test($('#zip').val())) {
        $('#returnString').remove();
        let zip = $('#zip').val();
        console.log(zip);
        return zip;
      } else {
        $('#returnString').text("Please enter a five digit zip code.").css("color","red")
      }

    })
  }
  // got the zips
    filter.getZip()
    module.filter = filter;
  })(window);
