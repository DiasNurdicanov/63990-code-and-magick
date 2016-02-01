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
  var reviewFields =  document.querySelector('.review-fields');
  var reviewNameLabel = reviewFields.querySelector('label[for="review-name"]');
  var reviewTextLabel = reviewFields.querySelector('label[for="review-text"]');

  reviewName.required = true;
  reviewTextLabel.classList.add('invisible');
  reviewSubmit.disabled = true;

  reviewForm.onchange = function(){
  	if (reviewMark.value < 3 ){
  		reviewText.required = true;
  		reviewTextLabel.classList.remove('invisible');
  	}
  	else{
  		reviewTextLabel.classList.add('invisible');
  	}
  }

  function removeLink(){
  	if ( this.required ){
  		reviewFields.querySelector('label[for="' + this.id + '"]').classList.add('invisible')
  	}
  	if ( reviewNameLabel.classList.contains('invisible') && reviewTextLabel.classList.contains('invisible') ){
  		reviewFields.classList.add('invisible');
  		reviewSubmit.disabled = false;
  	}
  }

  reviewName.onchange = removeLink;
  reviewText.onchange = removeLink;


})();
