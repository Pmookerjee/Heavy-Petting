$("#tinderslide").jTinder({
  onDislike: function (item) {
    $('#status').html('Pass');
    Pets.saveViewed(item[0].id);
  },
  onLike: function (item) {
    console.log(Pets.all);
    $('#status').html('Saved to Favorites!');
    var zipStringId = item[0].id;
    for (var i in Pets.all) {
      var petsAllIds = Pets.all[i].id;
      if (zipStringId === (Pets.all[i].id).toString()) {
        Pets.saveLike(Pets.all[i]);
        Pets.saveViewed(Pets.all[i].id);
      }
    }
  },
  animationRevertSpeed: 200,
  animationSpeed: 400,
  threshold: 1,
  likeSelector: '.like',
  dislikeSelector: '.dislike'
});

$('#dislike').on('click', function(event){
  event.preventDefault();
  $("#tinderslide").jTinder('dislike');
});

$('#like').on('click', function(event){
  event.preventDefault()
  $("#tinderslide").jTinder('like');
});
