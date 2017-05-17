'use strict';

(function(module) {

  const PetView = {};


  PetView.initPetPage = () => { console.log('PetView.initPetPage callback successful')}

  module.PetView = PetView;

})(window)
