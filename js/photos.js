'use strict';

define([
  'photo',
  'gallery'
], function(Photo, Gallery) {

  var photogalleryImages = document.querySelectorAll('.photogallery-image img');
  var photosArray = [].map.call(photogalleryImages, function(photo) {
    return new Photo(photo.getAttribute('src'));
  });

  var gallery = new Gallery();
  gallery.setPictures(photosArray);

  [].forEach.call(photogalleryImages, function(photo) {
    photo.addEventListener('click', function(e) {
      e.preventDefault();
      location.hash = 'photo/' + this.getAttribute('src');
    });
  });

  function onHashChange() {
    var newHash = location.hash;
    var re = /#photo\/(\S+)/;

    if (newHash.match(re)) {
      gallery.setCurrentPicture(newHash.match(re)[1]);
    }

    if (location.hash.indexOf('photo') !== -1) {
      gallery.show();
    } else {
      gallery.hide();
    }
  }

  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('load', onHashChange);

});
