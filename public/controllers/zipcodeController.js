'use stict';

(module => {
  const zipcodeController = {};
  zipcodeController.index = () => {
    $('.tab-content').hide();
    $('#zipcode').fadeIn();
  };

  module.zipcodeController = zipcodeController;
})(window);
