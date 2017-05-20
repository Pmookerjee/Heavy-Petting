'use strict';

(module => {

const Faves = {};
Faves.all = [];


Faves.render = Handlebars.compile($('#favesTemplate').html());

Faves.renderFaves = () => {
  console.log('in renderFaves');
   if(localStorage.getItem('Likes') === null){
     console.log('there is nothing in local storage');
     let imgPlaceholder = '<img class="empty-faves-pic" src="assets/oops.jpg"></img>';
     let textPlaceholder = '<p class="empty-faves-text">Looks like you dont have any animals saved yet!</p>';
     $('#renderToFaves').append(imgPlaceholder);
     $('#renderToFaves').append(textPlaceholder);
    } else {
      Faves.all = JSON.parse(localStorage.getItem('Likes'));
      Faves.all.forEach(fave => {
      $('#renderToFaves').append(Faves.render(fave));
  });
 }
}

$('#clearall').on('click', function(event){
  event.preventDefault();
  localStorage.clear();
  window.location.reload(false);
  page('/faves');
});

$('#home').on('click', function(event){
  event.preventDefault();
  page('/');
});

$(document).on('click', '.close', function(event){
  event.preventDefault();
  let petId = $(this).attr('id');
  Pets.removeFromLikes(petId);
  location.reload();
});

module.Faves = Faves;

})(window);
