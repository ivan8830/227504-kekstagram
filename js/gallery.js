'use strict';

window.gallery = (function () {
  var closeWindow = document.querySelector('.big-picture__cancel');
  var modalOpen = document.querySelector('body');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      closeAllPopup();
    }
  };

  var openPopup = function () {
    window.preview.user.classList.remove('hidden');
    modalOpen.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeAllPopup = function () {
    window.preview.user.classList.add('hidden');
    window.form.upload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openWindow = document.querySelector('.pictures');
  openWindow.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      openPopup();
    }
  });

  openWindow.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' && evt.target.tagName !== 'BUTTON') {
      openPopup();
    }
  });

  closeWindow.addEventListener('click', function () {
    closeAllPopup();
  });

  return {
    onPopupEscPress: onPopupEscPress,
    openPopup: openPopup,
    closeAllPopup: closeAllPopup,
  };
})();
