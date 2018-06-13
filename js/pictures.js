'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var renderCards = function (arr) {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector('.picture__img').src = arr[i].url;
    picturesElement.querySelector('.picture__img').tabindex = 0;
    picturesElement.querySelector('.picture__stat--likes').textContent = arr[i].likes;
    picturesElement.querySelector('.picture__stat--comments').textContent = arr[i].comments.length;
    fragment.appendChild(picturesElement);
  }

  pictures.appendChild(fragment);

  return pictures;
};

var showDialogUser = function (data) {
  userWindow.classList.remove('hidden');

  userWindow.querySelector('.big-picture__img').src = data.url;
  userWindow.querySelector('.likes-count').textContent = data.likes;
  userWindow.querySelector('.comments-count').textContent = data.comments.length;

  var commentsCard = userWindow.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.comments.length; i++) {
    var el = commentsCard.children[0].cloneNode(true);
    el.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
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

var userWindow = document.querySelector('.big-picture');
var closeWindow = document.querySelector('.big-picture__cancel');
var modalOpen = document.querySelector('Body');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userWindow.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  showDialogUser(users[0]);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var users = generateArray(25, generateData);
renderCards(users);

var openWindow = document.querySelector('.pictures');
openWindow.addEventListener('click', function () {
  openPopup();
});

openWindow.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

closeWindow.addEventListener('click', function () {
  closePopup();
});

closeWindow.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
