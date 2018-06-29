'use strict';

window.picture = (function () {
  var renderCards = function (arr) {
    var pictures = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var picturesElement = pictureTemplate.cloneNode(true);
      picturesElement.querySelector('.picture__img').src = arr[i].url;
      picturesElement.querySelector('.picture__stat--likes').textContent = arr[i].likes;
      picturesElement.querySelector('.picture__stat--comments').textContent = arr[i].comments.length;
      fragment.appendChild(picturesElement);
    }

    pictures.appendChild(fragment);

    return pictures;
  };

  var users = window.data.generateArray(25, window.data.generateData);
  renderCards(users);

  return users;
})();
