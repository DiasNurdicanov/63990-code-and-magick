/* global reviews */

'use strict';

(function() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var rating = '';

  reviewsFilter.classList.add('invisible');

  function createElement(data) {
    var template = document.querySelector('#review-template');
    var element;

    if ( 'content' in template ) {
      element = template.content.childNodes[1].cloneNode(true);
    } else {
      element = template.childNodes[1].cloneNode(true);
    }

    var reviewRating = element.querySelector('.review-rating');

    switch (data.rating) {
      case 2:
        rating = 'review-rating-two';
        break;
      case 3:
        rating = 'review-rating-three';
        break;
      case 4:
        rating = 'review-rating-four';
        break;
      case 5:
        rating = 'review-rating-five';
        break;
    }

    reviewRating.classList.add(rating);
    element.querySelector('.review-text').textContent = data.description;

    var authorAvatar = new Image();
    var reviewImg = element.querySelector('.review-author');

    authorAvatar.onload = function() {
      element.replaceChild(authorAvatar, reviewImg);
      authorAvatar.classList.add('review-author');
      authorAvatar.width = '124';
      authorAvatar.height = '124';
      authorAvatar.title = data.author.name;
    };

    authorAvatar.onerror = function() {
      element.classList.add('review-load-failure');
    };

    authorAvatar.src = data.author.picture;

    return element;
  }

  reviews.forEach(function(review) {
    var element = createElement(review);
    reviewsList.appendChild(element);
  });

  reviewsFilter.classList.remove('invisible');

})();
