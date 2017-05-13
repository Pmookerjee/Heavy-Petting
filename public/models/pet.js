'use strict'

(module => {
  function Pets(petInfo) {
    Object.keys(petInfo).forEach(key => this[key] = petInfo[key]);
  }

  Pets.all = [];

  Pets.prototype.toHtml = function () {
    const template = Handlebars.compile($('#').text());
    return template(this);
  };

  Pets.prototype.insertRecord = function(callback) {
    $.post('#', {#})
    .then(console.log)
    .then(callback);
  };

module.Pets = Pets;
})(window);
