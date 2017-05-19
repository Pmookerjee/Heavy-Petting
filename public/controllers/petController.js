'use strict';

(module => {
  const petController = {};

  petController.index = () => {

    $('.tab-content').hide();
    $('#selectionPage').fadeIn();

  };

  module.petController = petController;
})(window);
