'use strict';

window.preview = (function () {
  var userWindow = document.querySelector('.big-picture');
  var visibleCommentCount = 5;
  var commentsCard = userWindow.querySelector('.social__comments');
  var buttonLoad = userWindow.querySelector('.social__loadmore');
  var bigPictureCancel = userWindow.querySelector('.big-picture__cancel');
  var modalOpen = document.querySelector('body');
  var bigPictureImg = userWindow.querySelector('.big-picture__img');

  var comments = '';
  var remveHandlers = [];

  var open = function () {
    userWindow.classList.remove('hidden');
    modalOpen.classList.add('modal-open');
    remveHandlers.push(window.utils.addEventListener(document, 'keydown', function (evt) {
      if (evt.keyCode === window.utils.escCode) {
        close();
      }
    }));

    remveHandlers.push(window.utils.addEventListener(bigPictureCancel, 'keydown', function (evt) {
      if (evt.keyCode === window.utils.enterCode) {
        close();
      }
    }));
    remveHandlers.push(window.utils.addEventListener(bigPictureCancel, 'click', close));
  };

  var close = function () {
    userWindow.classList.add('hidden');
    modalOpen.classList.remove('modal-open');

    remveHandlers.forEach(function (fn) {
      fn();
    });
  };

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  var render = function (data) {
    comments = data.comments.slice(0, visibleCommentCount);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var listCard = makeElement('li', 'social__comment');

      listCard.classList.add('social__comment--text');

      var imageCard = makeElement('img', 'social__picture');

      imageCard.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
      imageCard.alt = 'Аватар комментатора фотографии';
      imageCard.width = '35';
      imageCard.height = '35';

      var textCard = makeElement('p', 'social__text');
      textCard.textContent = data.comments[i];
      listCard.appendChild(imageCard);
      listCard.appendChild(textCard);
      fragment.appendChild(listCard);
    }

    commentsCard.innerHTML = '';
    commentsCard.appendChild(fragment);
    var socialCommentCount = userWindow.querySelector('.social__comment-count');
    socialCommentCount.textContent = Math.min(visibleCommentCount, data.comments.length) + ' из ' + data.comments.length;
    buttonLoad.hidden = visibleCommentCount >= data.comments.length;
  };

  var showDialogUser = function (data) {
    open();
    bigPictureImg.querySelector('img').src = data.url;
    userWindow.querySelector('.likes-count').textContent = data.likes;
    visibleCommentCount = 5;

    render(data);
    remveHandlers.push(window.utils.addEventListener(buttonLoad, 'click', function () {
      visibleCommentCount += 5;
      render(data);
    }));
    userWindow.querySelector('.social__caption').textContent = data.descriptions;
    return userWindow;
  };

  return {
    user: userWindow,
    showDialogUser: showDialogUser
  };
})();
