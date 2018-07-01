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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadHandler, errorHandler);

  return {
    error: errorHandler
  };
})();
