'use strict';

window.picture = (function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var creatElements = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(renderCards(cards[i]));
    }
    pictures.appendChild(fragment);
  };

  var renderCards = function (card) {

    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = card.url;
    picturesElement.querySelector('.picture__stat--likes').textContent = card.likes;
    picturesElement.querySelector('.picture__stat--comments').textContent = card.comments.length;

    picturesElement.addEventListener('click', function () {
      window.preview.showDialogUser(card);
    });

    return picturesElement;
  };

  var loadHandler = function (cards) {
    window.picture.photos = cards;

    creatElements(cards);

  };

  var showError = function (errorMessage) {
    var errorTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.classList.remove('hidden');
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.backend.load(loadHandler, showError);

  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  var filterPopular = imgFilters.querySelector('#filter-popular');
  var filterNew = imgFilters.querySelector('#filter-new');
  var filterDiscussed = imgFilters.querySelector('#filter-discussed');

  var currentFilter = 'popular';
  var filters = {
    popular: function (all) {
      return all.slice();
    },
    new: function (ten) {
      return ten.slice(0, 10);
    },
    discussed: function (all) {
      return all.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    }
  };

  var applyFilter = function () {
    for (var i = 0; i < imgFiltersButton.length; i++) {
      imgFiltersButton[i].classList.remove('img-filters__button--active');
    }
    var picturesLink = document.querySelectorAll('.picture__link');
    var allPhotos = window.picture.photos;
    for (var j = 0; j < picturesLink.length; j++) {
      picturesLink[j].remove();
    }
    imgFilters.querySelector('#filter-' + currentFilter).classList.add('img-filters__button--active');
    var photos = filters[currentFilter](allPhotos);
    creatElements(photos);
  };

  var setFilter = function (name) {
    return function () {
      currentFilter = name;
      applyFilter();
    };
  };

  filterPopular.addEventListener('click', setFilter('popular'));
  filterNew.addEventListener('click', setFilter('new'));
  filterDiscussed.addEventListener('click', setFilter('discussed'));

  return {
    photos: [],
  };
})();
