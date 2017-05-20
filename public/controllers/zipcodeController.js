'use stict';

(module => {
  const zipcodeController = {};
  zipcodeController.index = () => {

    $('.tab-content').hide();
    $('#getStart').show();
  };

  module.zipcodeController = zipcodeController;
})(window);
