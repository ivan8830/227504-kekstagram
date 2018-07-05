'use strict';

window.preview = (function () {
  var userWindow = document.querySelector('.big-picture');
  var visibleCommentCount = 5;
  var commentsCard = userWindow.querySelector('.social__comments');
  var buttonLoad = userWindow.querySelector('.social__loadmore');

  userWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      userWindow.classList.add('hidden');
    }
  });
  var comments = '';

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
    userWindow.classList.remove('hidden');
    userWindow.querySelector('.big-picture__img').src = data.url;
    userWindow.querySelector('.likes-count').textContent = data.likes;
    visibleCommentCount = 5;

    render(data);

    buttonLoad.addEventListener('click', function () {
      visibleCommentCount += 5;
      render(data);
    });
    userWindow.querySelector('.social__caption').textContent = data.descriptions;
    return userWindow;
  };

  return {
    user: userWindow,
    showDialogUser: showDialogUser
  };
})();
