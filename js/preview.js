'use strict';

window.preview = (function () {
  var userWindow = document.querySelector('.big-picture');
  var showDialogUser = function (data) {
    userWindow.classList.remove('hidden');

    userWindow.querySelector('.big-picture__img').src = data.url;
    userWindow.querySelector('.likes-count').textContent = data.likes;
    userWindow.querySelector('.comments-count').textContent = data.comments.length;

    var commentsCard = userWindow.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.comments.length; i++) {
      var el = commentsCard.children[0].cloneNode(true);
      el.querySelector('.social__picture').src = 'img/avatar-' + window.data.randomNumber(1, 6) + '.svg';
      el.querySelector('.social__text').innerText = data.comments[i];
      fragment.appendChild(el);
    }

    commentsCard.innerHTML = '';
    commentsCard.appendChild(fragment);
    userWindow.querySelector('.social__caption').textContent = data.description;
    userWindow.querySelector('.social__comment-count').classList.add('visually-hidden');
    userWindow.querySelector('.social__loadmore').classList.add('visually-hidden');

    return userWindow;
  };

  return {
    user: userWindow,
    dialogUser: showDialogUser
  };
})();
