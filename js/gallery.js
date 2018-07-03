'use strict';

window.gallery = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var closeWindow = document.querySelector('.big-picture__cancel');
  var modalOpen = document.querySelector('body');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
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
    if (evt.keyCode === ENTER_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' && evt.target.tagName !== 'BUTTON') {
      openPopup();
    }
  });

  closeWindow.addEventListener('click', function () {
    closeAllPopup();
  });

  return {
    escCode: ESC_KEYCODE,
    escPress: onPopupEscPress,
    open: openPopup,
    close: closeAllPopup,
    enterKey: ENTER_KEYCODE
  };
})();
