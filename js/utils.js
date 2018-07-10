'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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
    if (evt.keyCode === 27) {
      evt.target.blur();
    }
  };

  return {
    escCode: ESC_KEYCODE,
    enterCode: ENTER_KEYCODE,
    getRandomNumber: getRandomNumber,
    addEventListener: addEventListener,
    blurAfterEsc: blurAfterEsc
  };
})();

