'use strict';

define([], function() {

  /**
   * @param {Object} data
   */
  function Review(data) {
    this._data = data;
  }

  Review.prototype.render = function() {

    var template = document.querySelector('#review-template');
    var rating = '';

    if ( 'content' in template ) {
      this.element = template.content.childNodes[1].cloneNode(true);
    } else {
      this.element = template.childNodes[1].cloneNode(true);
    }

    var reviewRating = this.element.querySelector('.review-rating');

    switch (this._data.rating) {
      case 1:
        rating = 'review-rating';
        break;
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
    this.element.querySelector('.review-text').textContent = this._data.description;

    var authorAvatar = new Image();
    var reviewImg = this.element.querySelector('.review-author');

    authorAvatar.onload = function() {
      this.element.replaceChild(authorAvatar, reviewImg);
      authorAvatar.classList.add('review-author');
      authorAvatar.width = '124';
      authorAvatar.height = '124';
      authorAvatar.title = this._data.author.name;
    }.bind(this);

    authorAvatar.onerror = function() {
      this.element.classList.add('review-load-failure');
    }.bind(this);

    authorAvatar.src = this._data.author.picture;

  };

  return Review;

});
