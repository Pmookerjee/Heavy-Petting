'use strict';

(module => {

const Faves = {};
Faves.all = [];


Faves.render = Handlebars.compile($('#favesTemplate').html());

Faves.renderFaves = () => {
   Faves.all = JSON.parse(localStorage.getItem('Likes'));

  console.log("in render FAVES");
  // Faves.all.forEach(fave => {
  //   // if(Pets.all.idindexOf(fave)))
  //
  //   $('#faves').append(Faves.render(pet));
  // });
}

module.Faves = Faves;

})(window);
