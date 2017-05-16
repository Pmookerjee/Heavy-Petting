'use strict';

(function(module) {

  const PetView = {};
  let zipcode = '98119'

  PetView.initPetPage = () => { console.log('PetView.initPetPage callback successful')}

  module.PetView = PetView;

})(window)
