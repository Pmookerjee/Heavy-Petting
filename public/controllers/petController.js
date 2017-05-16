'use strict';

(module => {
  const petController = {};
  petController.index = () => {

    $('.tab-content').hide();
    $('#pet').fadeIn();
  };

  module.petController = petController;
})(window);
