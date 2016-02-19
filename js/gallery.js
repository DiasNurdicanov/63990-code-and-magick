'use strict';

(function() {

  function Gallery() {
    this.element = document.querySelector('.overlay-gallery');
    this._closeButton = this.element.querySelector('.overlay-gallery-close');
    this._leftButton = this.element.querySelector('.overlay-gallery-control-left');
    this._rightButton = this.element.querySelector('.overlay-gallery-control-right');

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
    console.log('left');
  };

  Gallery.prototype._onRightClick = function() {
    console.log('right');
  };

  Gallery.prototype._onDocumentKeyDown = function(e) {
    if ( e.keyCode === 27 ) {
      this.hide();
    }
  };

  window.Gallery = Gallery;

})();
