/* global Review: true */

'use strict';

(function() {

  var reviewsList = document.querySelector('.reviews-list');
  var reviews = [];
  var reviewsfiltered = [];
  var activePage = 0;
  var pageSize = 3;

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
      var renderedReviews = reviewsList.querySelectorAll('.review');

      [].forEach.call(renderedReviews, function(el) {
        reviewsList.removeChild(el);
      });
    }

    var start = pageNumber * pageSize;
    var end = start + pageSize;
    var reviewsPage = arr.slice(start, end);

    reviewsPage.forEach(function(review) {
      var ReviewElement = new Review(review);
      ReviewElement.render();
      reviewsList.appendChild(ReviewElement.element);
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
