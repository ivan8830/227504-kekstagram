'use strict';

window.preview = (function () {
  var userWindow = document.querySelector('.big-picture');
  var showAllComments = false;

  userWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.gallery.escCode && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      userWindow.classList.add('hidden');
    }
  });

  var showDialogUser = function (data) {
    userWindow.classList.remove('hidden');
    showAllComments = false;
    userWindow.querySelector('.big-picture__img').src = data.url;
    userWindow.querySelector('.likes-count').textContent = data.likes;
    userWindow.querySelector('.comments-count').textContent = data.comments.length;

    var commentsCard = userWindow.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    var comments = showAllComments ? data.comments : data.comments.slice(0);

    for (var i = 0; i < comments.length; i++) {
      var el = commentsCard.children[0].cloneNode(true);
      el.querySelector('.social__picture').src = 'img/avatar-' + window.data.randomNumber(1, 6) + '.svg';
      el.querySelector('.social__text').innerText = comments[i];
      fragment.appendChild(el);
    }

    commentsCard.innerHTML = '';
    commentsCard.appendChild(fragment);

    var buttonLoad = userWindow.querySelector('.social__comment-count');
    buttonLoad.addEventListener('click', function () {
      showAllComments = true;
      showDialogUser(data);
    });
    userWindow.querySelector('.social__caption').textContent = window.data.description[window.data.getRandomValue(window.data.description)];
    userWindow.querySelector('.social__comment-count').classList.add('visually-hidden');
    userWindow.querySelector('.social__loadmore').classList.add('visually-hidden');

    return userWindow;
  };

  return {
    user: userWindow,
    showDialogUser: showDialogUser
  };
})();
