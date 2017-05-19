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

module.Faves = Faves;

})(window);
