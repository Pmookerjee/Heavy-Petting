'use strict';

(function(module) {

  const PetView = {};

  Pets.fetchByZipcode(PetView.initPetPage);

  PetView.initPetPage = () => { console.log('PetView.initPetPage callback successful')}

  module.PetView = PetView;

})(window)
