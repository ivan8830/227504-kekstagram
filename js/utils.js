'use strict';

window.utils = (function () {
  var getRandomNumber = function (from, to) {
    return Math.floor((Math.random() * (to - from + 1)) + from);
  };

  var getRandomValue = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  return {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandomNumber: getRandomNumber,
    getRandomValue: getRandomValue
  };
})();

