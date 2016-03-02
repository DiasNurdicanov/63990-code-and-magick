/* global docCookies */

'use strict';

define([], function() {
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

  /**
   * Функция проверяет валидность переданного поля,
   * и скрывает label для этого поля если не валидно
   * @param {HTMLElement} field
   */
  function removeLink(field) {
    var label = reviewFields.querySelector('label[for="' + field.id + '"]');

    if (field.validity.valid) {
      label.classList.add('invisible');
    } else {
      label.classList.remove('invisible');
    }
  }

  //Функция проверяет валидность формы
  function formIsValid() {
    var isValid = true;

    reviewText.required = reviewMark.value < 3;

    for (var i = 0; i < reviewForm.elements.length; i++) {
      isValid = reviewForm.elements[i].validity.valid;
      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      reviewFields.classList.add('invisible');
    } else {
      reviewFields.classList.remove('invisible');
    }

    removeLink(reviewName);
    removeLink(reviewText);

    reviewSubmit.disabled = !isValid;

  }

  reviewForm.onsubmit = function(e) {
    e.preventDefault();

    var daysNum = getDays('1994-12-27');

    docCookies.setItem('name', reviewName.value, daysNum);
    docCookies.setItem('mark', reviewMark.value, daysNum);

    reviewForm.submit();

  };

  /**
   * Функция возвращает кол-во дней прошедших с переданной даты
   * @param {string} brithday
   * @return {Date} expiresDate
   */
  function getDays(brithday) {
    var nowDate = new Date();
    var birthdayDate = new Date(brithday);
    var lastBirthday = new Date( nowDate.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate() );

    if ((nowDate - lastBirthday) < 0) {
      lastBirthday = new Date( nowDate.getFullYear() - 1, birthdayDate.getMonth(), birthdayDate.getDate() );
    }

    var daysNum = +Date.now() + (nowDate - lastBirthday);
    var expiresDate = new Date(daysNum).toUTCString();

    return expiresDate;
  }
});
