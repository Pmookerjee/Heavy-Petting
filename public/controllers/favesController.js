'use strict';

(module => {
  const favesController = {};
  favesController.index = () => {
    $('.tab-content').hide();
    $('#faves').fadeIn();
    Faves.renderFaves();
  };

  module.favesController = favesController;
})(window);
