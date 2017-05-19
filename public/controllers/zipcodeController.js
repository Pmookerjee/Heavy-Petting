'use stict';

(module => {
  const zipcodeController = {};
  zipcodeController.index = () => {

    $('.tab-content').hide();
    $('#getStart').fadeIn();
  };

  module.zipcodeController = zipcodeController;
})(window);
