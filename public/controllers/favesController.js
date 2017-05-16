'use strict';

(module => {
  const favesController = {};
  favesController.index = () => {

    $('.tab-content').hide();
    $('#faves').fadeIn();
  };

  module.favesController = favesController;
})(window);
