'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var STEP_PLUS = 25;
var STEP_MINUS = 25;

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
var modalOpen = document.querySelector('body');

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
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openWindow = document.querySelector('.pictures');
openWindow.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('picture__img')) {
    openPopup();
  }
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

var uploadFile = document.querySelector('#upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  openPopapEdit();
});

var openPopapEdit = function () {
  imgUpload.classList.remove('hidden');
  uploadFile.innerHTML = uploadFile.innerHTML;
  document.addEventListener('keydown', onPopupEscPress);
};

var buttonCancel = document.querySelector('#upload-cancel');
buttonCancel.addEventListener('click', function () {
  closePopup();
});
buttonCancel.addEventListener('keydown', onPopupEscPress);

var resize = document.querySelector('.img-upload__resize');
var resizePlus = resize.querySelector('.resize__control--plus');
var resizeMinus = resize.querySelector('.resize__control--minus');
var resizeValue = resize.querySelector('.resize__control--value');
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');

resizePlus.addEventListener('click', function () {
  resizeValue.value = Math.min(100, (parseInt(resizeValue.value, 10) + STEP_PLUS)) + '%';
  imgUploadPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
});

resizeMinus.addEventListener('click', function () {
  resizeValue.value = Math.max(25, (parseInt(resizeValue.value, 10) - STEP_MINUS)) + '%';
  imgUploadPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
});

var effectOrigin = imgUpload.querySelector('#effect-none');
var effectChrom = imgUpload.querySelector('#effect-chrome');
var effectSepia = imgUpload.querySelector('#effect-sepia');
var effectMarvin = imgUpload.querySelector('#effect-marvin');
var effectPhobos = imgUpload.querySelector('#effect-phobos');
var effectHeat = imgUpload.querySelector('#effect-heat');

var effects = [
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat',
  'effects__preview--none'
];

var removeElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    imgUploadPreview.classList.remove(arr[i]);
  }
};

effectOrigin.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--none');
});

effectChrom.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--chrome');
});

effectSepia.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--sepia');
});

effectMarvin.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--marvin');
});

effectPhobos.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--phobos');
});

effectHeat.addEventListener('click', function () {
  removeElements(effects);
  imgUploadPreview.classList.add('effects__preview--heat');
});

var hashTeg = imgUpload.querySelector('.text__hashtags');

hashTeg.addEventListener('input', function () {
  var tagText = hashTeg.value;
  var arr = tagText.split(' ');

  for (var i = 0; i < arr.length; i++) {
    var arrElement = arr[i];
    arrElement.toLowerCase();

    if (arr[i - 1] === arrElement) {
      hashTeg.setCustomValidity('Не может быть двух одинаковых хэш-тегов');
      break;
    }
    arrElement.split('');
    if (arrElement[0] !== '#') {
      hashTeg.setCustomValidity('Хэш-тег должен начинаться с #');
    } else if (hashTeg.validity.tooShort) {
      hashTeg.setCustomValidity('Хэш-тег не должен быть короче 2 символов');
    } else if (hashTeg.validity.tooLong) {
      hashTeg.setCustomValidity('Хэш-тег не должен превышать 20 символов');
    } else {
      hashTeg.setCustomValidity('');
    }
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hashTeg.blur();
    }
  });
});

var commentsText = imgUpload.querySelector('.text__description');

commentsText.addEventListener('input', function () {
  if (commentsText.value.length > 140) {
    commentsText.setCustomValidity('Комметарий не должен превышать 140 символов');
  } else {
    commentsText.setCustomValidity('');
  }
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      commentsText.blur();
    }
  });
});

var users = generateArray(25, generateData);
renderCards(users);
