'use strict';

define([
  'review'
], function(Review) {

  var reviewsList = document.querySelector('.reviews-list');
  var reviewsWrap = document.querySelector('.reviews');
  var reviewsMoreBtn = document.querySelector('.reviews-controls-more');
  var filtersForm = document.querySelector('.reviews-filter');
  var filterList = filtersForm['reviews'];

  var reviews = [];
  var filteredReviews = [];
  var pagesCount = 0;
  var activePage = 0;
  var activeFilter = localStorage.getItem('activeFilter') || 'reviews-all';

  /**
   * @const {number}
   */
  var XHR_TIMEOUT = 30000;

  /**
   * @const {number}
   */
  var PAGE_SIZE = 3;

  function loadReviewList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = XHR_TIMEOUT;

    reviewsWrap.classList.add('reviews-list-loading');

    xhr.onload = function(e) {
      var data = e.target.response;
      reviews = JSON.parse(data);
      reviewsFilter(activeFilter);
      reviewsWrap.classList.remove('reviews-list-loading');
    };

    xhr.onerror = function() { // Как проверить?
      reviewsWrap.classList.add('reviews-load-failure');
    };

    xhr.send();

    //я что-то не понимаю как этим пользоваться

  /*xhr.onreadystatechange = function(evt) {
      var loadedXhr = evt.target;

      switch (loadedXhr.readyState) {
        case loadedXhr.readyState.OPENED:
        case loadedXhr.readyState.HEADERS_RECEIVED:
        case loadedXhr.readyState.LOADING:
          reviewsWrap.classList.add('reviews-list-loading');
          break;
        case loadedXhr.readyState.DONE:
          var data = evt.target.response;

          reviews = JSON.parse(data);
          filteredReviews = reviews.slice(0);
          renderReviews(reviews, 0, true);

          reviewsWrap.classList.remove('reviews-list-loading');

          break;
      }

      if (this.status !== 200) {
        reviewsWrap.classList.add('reviews-load-failure');
      }
    };*/
  }

  loadReviewList();

  /**
   * Функция отрисовывает постанично массив.
   * @param {Array.} arr
   * @param {number} pageNumber
   * @param {boolean} clean
   */
  function renderReviews(arr, pageNumber, clean) {
    if ( clean ) {
      var renderedReviews = reviewsList.querySelectorAll('.review');

      [].forEach.call(renderedReviews, function(el) {
        reviewsList.removeChild(el);
      });
    }

    var start = pageNumber * PAGE_SIZE;
    var end = start + PAGE_SIZE;
    var reviewsPage = arr.slice(start, end);

    reviewsPage.forEach(function(review) {
      var reviewElement = new Review(review);
      reviewElement.render();
      reviewsList.appendChild(reviewElement.element);
    });
  }

  //Обработка кнопки 'Показать еще'

  reviewsMoreBtn.addEventListener('click', function() {

    pagesCount = Math.ceil(filteredReviews.length / PAGE_SIZE);

    if (activePage < pagesCount) {
      renderReviews(filteredReviews, ++activePage, false);
    }

    if ( activePage + 1 === pagesCount) {
      reviewsMoreBtn.classList.add('invisible');
    }

  });

  /**
   * Функция выполняет сортировку коллекции элементов.
   * Сортировка может быть выполнена по произвольному свойству
   * объекта и в определенном направлении (asc, desc)
   * @param {Array.} items
   * @param {string} property
   * @param {string} sortType
   */
  function sortItems(items, property, sortType) {

    switch (sortType) {
      case 'desc':
        items.sort(function(a, b) {
          if (a[property] > b[property]) {
            return -1;
          }
          if (a[property] < b[property]) {
            return 1;
          }
        });

        break;

      case 'asc':
        items.sort(function(a, b) {
          if (a[property] > b[property]) {
            return 1;
          }
          if (a[property] < b[property]) {
            return -1;
          }
        });

        break;

      default: break;
    }

    return items;

  }

  /**
   * Фильтрация массива.
   * @param {number} filterId
   */
  function reviewsFilter(filterId) {

    if (filterList.value !== filterId) {
      filterList.value = filterId;
    }

    filteredReviews = reviews.slice(0);

    activePage = 0;
    reviewsMoreBtn.classList.remove('invisible');

    switch ( filterId ) {
      case 'reviews-recent':
        var today = new Date('2016-01-31'); //для проверки
        var halfYear = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14); //14-2 недели

        filteredReviews = filteredReviews.filter(function(element) {
          return Date.parse(element.date) >= halfYear.getTime();
        });

        sortItems(filteredReviews, 'date', 'desc');

        break;

      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(el) {
          return el.rating >= 3;
        });

        sortItems(filteredReviews, 'rating', 'desc');

        break;

      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(el) {
          return el.rating <= 2;
        });

        sortItems(filteredReviews, 'rating', 'asc');

        break;

      case 'reviews-popular':
        sortItems(filteredReviews, 'review_usefulness', 'desc');

        break;

      default:
        filteredReviews = reviews.slice(0);
    }

    renderReviews(filteredReviews, activePage, true);

    pagesCount = Math.ceil(filteredReviews.length / PAGE_SIZE);

    if (pagesCount === 1) {
      reviewsMoreBtn.classList.add('invisible');
    }
  }

  filtersForm.onchange = function() {
    activeFilter = filterList.value;
    reviewsFilter(activeFilter);
    localStorage.setItem('activeFilter', activeFilter);
  };

});
