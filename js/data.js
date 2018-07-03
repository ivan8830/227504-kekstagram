'use strict';

window.data = (function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море.',
    'Как же круто тут кормят.',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var getRandomNumber = function (from, to) {
    return Math.floor((Math.random() * (to - from + 1)) + from);
  };

  var getRandomValue = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var generateComments = function () {
    return comments[getRandomValue(comments)];
  };

  var generateArray = function (size, generator) {
    var cards = [];
    for (var i = 0; i < size; i++) {
      cards.push(generator(i));
    }
    return cards;
  };

  var generateData = function (i) {
    return {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: generateArray(getRandomNumber(1, 2), generateComments),
      description: description[getRandomValue(description)]
    };
  };

  return {
    generateArray: generateArray,
    generateData: generateData,
    randomNumber: getRandomNumber,
    getRandomValue: getRandomValue,
    description: description
  };
})();
