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
  console.log("gobanana");
})

module.Faves = Faves;

})(window);
