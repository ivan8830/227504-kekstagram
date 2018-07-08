'use strict';

window.utils = (function () {
  var getRandomNumber = function (from, to) {
    return Math.floor((Math.random() * (to - from + 1)) + from);
  };

  var addEventListener = function (el, type, handler) {
    el.addEventListener(type, handler);

    return function () {
      el.removeEventListener(type, handler);
    };
  };

  var blurAfterEsc = function (evt) {
    if (evt.keyCode === 27 && evt.target) {
      evt.target.blur();
    }
  };

  return {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomNumber: getRandomNumber,
    addEventListener: addEventListener,
    blurAfterEsc: blurAfterEsc
  };
})();

