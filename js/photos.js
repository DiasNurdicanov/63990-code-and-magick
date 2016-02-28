/* global Photo: true, Gallery: true  */

'use strict';

(function() {

  var photogalleryItems = document.querySelectorAll('.photogallery-image');
  var photogalleryImages = document.querySelectorAll('.photogallery-image img');
  var photosArray = [].map.call(photogalleryImages, function(photo) {
    return new Photo(photo.getAttribute('src'));
  });

  var gallery = new Gallery();
  gallery.setPictures(photosArray);

  [].forEach.call(photogalleryItems, function(photo, i) {
    photo.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.setCurrentPicture(i);
      gallery.show();
    });
  });


})();
