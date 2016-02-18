'use strict';

(function() {

  var reviewsList = document.querySelector('.reviews-list');
  var rating = '';
  var reviews = [];
  var reviewsfiltered = [];
  var activePage = 0;
  var pageSize = 3;

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

  var reviewsWrap = document.querySelector('.reviews');

  function loadReviewList() {
    var XHR_TIMEOUT = 30000;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = XHR_TIMEOUT;

    reviewsWrap.classList.add('reviews-list-loading');

    xhr.onload = function(e) {
      var data = e.target.response;
      reviews = JSON.parse(data);
      reviewsfiltered = reviews.slice(0);
      renderReviews(reviews, 0, true);

      reviewsWrap.classList.remove('reviews-list-loading');
    };

    xhr.onerror = function() { // Как проверить?
      reviewsWrap.classList.add('reviews-load-failure');
    };

    xhr.send();
  }

  loadReviewList();

  function renderReviews(arr, pageNumber, clean) {
    if ( clean ) {
      reviewsList.innerHTML = '';
    }

    var start = pageNumber * pageSize;
    var end = start + pageSize;
    var reviewsPage = arr.slice(start, end);

    reviewsPage.forEach(function(review) {
      var element = createElement(review);
      reviewsList.appendChild(element);
    });
  }

  //Обработка кнопки 'Показать еще'
  var reviewsMoreBtn = document.querySelector('.reviews-controls-more');

  reviewsMoreBtn.addEventListener('click', function() {
    if ( activePage < Math.ceil(reviewsfiltered.length / pageSize) ) {
      renderReviews(reviewsfiltered, ++activePage, false);
    } else {
      reviewsMoreBtn.classList.add('invisible'); //Почему не србатывает?)
    }
  });

  //фильтры
  var filtersForm = document.querySelector('.reviews-filter');
  var filterList = filtersForm['reviews'];

  filtersForm.onchange = function() {

    activePage = 0;
    pageSize = 3;

    reviewsfiltered = reviews.slice(0);

    switch ( filterList.value ) {
      case 'reviews-recent':
        // помогите с этим фильтром
        break;

      case 'reviews-good':
        var tmp = reviewsfiltered.filter(function(el) {
          return el.rating >= 3;
        });
        reviewsfiltered = tmp.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-bad':
        var temp = reviewsfiltered.filter(function(el) {
          return el.rating <= 2;
        });
        reviewsfiltered = temp.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-popular':
        reviewsfiltered = reviewsfiltered.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    renderReviews(reviewsfiltered, activePage, true);
  };

})();
