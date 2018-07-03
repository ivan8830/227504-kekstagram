'use strict';

window.picture = (function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

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

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderCards(cards[i]));
    }
    pictures.appendChild(fragment);

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

  var applyFilter = function () {
    for (var i = 0; i < imgFiltersButton.length; i++) {
      imgFiltersButton[i].classList.remove('img-filters__button--active');
    }
    if (currentFilter === 'popular') {
      filterPopular.classList.add('img-filters__button--active');
    } else if (currentFilter === 'new') {
      filterNew.classList.add('img-filters__button--active');
    } else if (currentFilter === 'discussed') {
      filterDiscussed.classList.add('img-filters__button--active');
    }
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
    error: showError,
    load: loadHandler
  };
})();
