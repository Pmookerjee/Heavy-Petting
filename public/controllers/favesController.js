'use strict';

(module => {
  const favesController = {};
  console.log('Hello! I am the Faves Controller')
  favesController.index = () => {

    $('.tab-content').hide();
    $('#faves').fadeIn();

    Faves.render();
    Faves.renderFaves();

  };



  module.favesController = favesController;
})(window);
