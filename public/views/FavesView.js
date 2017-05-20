'use strict';

(module => {

  const Faves = {};
  Faves.all = [];


  Faves.render = Handlebars.compile($('#favesTemplate').html());

  Faves.renderFaves = () => {
    Faves.all = JSON.parse(localStorage.getItem('Likes'));
    console.log("in render FAVES");
    Faves.all.forEach(fave => {
      $('#renderToFaves').append(Faves.render(fave));
    });
  }

  $('#clearall').on('click', function(event){
    event.preventDefault();
    localStorage.clear();
    window.location.reload(false);
    page('/faves');
  });

  $('#home').on('click', function(event){
    event.preventDefault();
    page('/');
  });



  // $('#totop').on('click', function(event){
  //   $('html, body').animate({
  //        scrollTop: $(".favesHead").offset().top
  //    }, 2000);
  // });

  module.Faves = Faves;

})(window);
