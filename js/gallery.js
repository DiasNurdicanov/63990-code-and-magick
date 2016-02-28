'use strict';

(function() {

  function Gallery() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._leftButton = this.element.querySelector('.overlay-gallery-control-left');
    this._rightButton = this.element.querySelector('.overlay-gallery-control-right');
    this._preview = this.element.querySelector('.overlay-gallery-preview');
    this._previewNumCurrent = this.element.querySelector('.preview-number-current');
    this._previewNumTotal = this.element.querySelector('.preview-number-total');

    this._onLeftClick = this._onLeftClick.bind(this);
    this._onRightClick = this._onRightClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  }

  Gallery.prototype.show = function() {
    this.element.classList.remove('invisible');

    this._closeButton.addEventListener('click', this._onCloseClick);
    this._leftButton.addEventListener('click', this._onLeftClick);
    this._rightButton.addEventListener('click', this._onRightClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype.hide = function() {
    this.element.classList.add('invisible');

    this._closeButton.removeEventListener('click', this._onCloseClick);
    this._leftButton.removeEventListener('click', this._onLeftClick);
    this._rightButton.removeEventListener('click', this._onRightClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onLeftClick = function() {
    this.prevImage();
  };

  Gallery.prototype._onRightClick = function() {
    this.nextImage();
  };

  Gallery.prototype._onDocumentKeyDown = function(e) {
    if ( e.keyCode === 27 ) {
      this.hide();
    }
    if ( e.keyCode === 37 ) {
      this.prevImage();
    }
    if ( e.keyCode === 39 ) {
      this.nextImage();
    }
  };

  Gallery.prototype.setPictures = function(photos) {
    this.photos = photos;
    this.totalCount = this.photos.length;
  };

  Gallery.prototype.setCurrentPicture = function(i) {
    this.activePhotoNum = i;

    var oldPhoto = this._preview.querySelector('img');

    if (oldPhoto) {
      this._preview.removeChild(oldPhoto);
    }

    var photo = new Image();
    photo.src = this.photos[this.activePhotoNum].src;
    photo.width = 500;

    this._preview.appendChild(photo);
    this._previewNumCurrent.innerHTML = i + 1;
    this._previewNumTotal.innerHTML = this.totalCount;
  };

  Gallery.prototype.prevImage = function() {
    if (this.activePhotoNum > 0) {
      this.setCurrentPicture(this.activePhotoNum - 1);
    }
  };

  Gallery.prototype.nextImage = function() {
    if (this.activePhotoNum + 1 < this.totalCount) {
      this.setCurrentPicture(this.activePhotoNum + 1);
    }
  };

  window.Gallery = Gallery;

})();
