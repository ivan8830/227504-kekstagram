'use strict';

window.picture = (function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var renderCards = function (card) {

    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = card.url;
    picturesElement.querySelector('.picture__stat--likes').textContent = card.likes;
    picturesElement.querySelector('.picture__stat--comments').textContent = card.comments.length;

    return picturesElement;
  };

  var loadHandler = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderCards(cards[i]));
    }
    pictures.appendChild(fragment);

  };

  var showError = function (errorMessage) {
    var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error').classList.remove('hidden');
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var users = window.backend.load(loadHandler, showError);
console.log(window.picture.user);
  return {
    user: users,
    error: showError,
    load: loadHandler
  };
})();
