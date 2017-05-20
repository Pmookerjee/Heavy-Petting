'use strict';

// card templater
(module => {

  const toDom = {};

  toDom.render = Handlebars.compile($('#cardTemplate').html());

  toDom.renderToCards = ()=>{
    Pets.all.forEach(function(pet) {
      $('#liAppend').append(toDom.render(pet));
      if(Pets.all.length === 1) {
        Pets.requestPet(Pets.fetchByZipcode);
      }
    });
  }
  module.toDom = toDom;

})(window);

$('input:text').focus(function(){$(this).val('');});
