'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var reviewForm = document.querySelector('.review-form');
  var reviewName = reviewForm['review-name'];
  var reviewText = reviewForm['review-text'];
  var reviewMark = reviewForm['review-mark'];
  var reviewSubmit = document.querySelector('.review-submit');
  var reviewFields = document.querySelector('.review-fields');
  var reviewTextLabel = reviewFields.querySelector('label[for="review-text"]');

  reviewName.required = true;
  reviewTextLabel.classList.add('invisible');
  reviewSubmit.disabled = true;
  reviewName.value = docCookies.getItem('name');
  reviewMark.value = docCookies.getItem('mark');

  formIsValid(); //Начальная проверка

  reviewForm.onchange = formIsValid;

  function removeLink(field) {
    var label = reviewFields.querySelector('label[for="' + field.id + '"]');

    if ( field.validity.valid ) {
      label.classList.add('invisible');
    } else {
      label.classList.remove('invisible');
    }
  }

  function formIsValid() {
    var isValid = true;

    if (reviewMark.value < 3 ) {
      reviewText.required = true;
    } else {
      reviewText.required = false;
    }

    for (var i = 0; i < reviewForm.elements.length; i++) {
      isValid = reviewForm.elements[i].validity.valid;
      if ( !isValid ) {
        break;
      }
    }

    if ( isValid ) {
      reviewFields.classList.add('invisible');
    }
    else {
      reviewFields.classList.remove('invisible');
    }

    removeLink(reviewName);
    removeLink(reviewText);

    reviewSubmit.disabled = !isValid;

  }

  reviewForm.onsubmit = function(e) {
    e.preventDefault();

    var daysNum = getDays('1994-12-27');

    document.cookie = 'name=' + reviewName.value + ';expires=' + daysNum;
    document.cookie = 'mark=' + reviewMark.value + ';expires=' + daysNum;

  }

  function getDays(brithday) {
    var nowDate = new Date();
    var birthdayDate = new Date(brithday);
    var lastBirthday = new Date( nowDate.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate() );

    if ( (nowDate - lastBirthday) < 0 ) {
      lastBirthday = new Date( nowDate.getFullYear() - 1, birthdayDate.getMonth(), birthdayDate.getDate() );
    }

    var daysNum = +Date.now() + (nowDate - lastBirthday);
    var expiresDate = new Date(daysNum).toUTCString();

    return expiresDate;
  }
})();