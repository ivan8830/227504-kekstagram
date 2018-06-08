'use strict'

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

var makeElement = function (tagName, className) {
	var element = document.createElement(tagName);
	element.classList.add(className);
	return element;
}

var generateData = function () {
	var cards = [];
	for (var i = 1; i <= 25; i++) {
		var user = {
			url: 'photos/' + i + '.jpg',
			likes:  getRandomNumber(LIKES_MIN, LIKES_MAX),
			comments: [comments[getRandomValue(comments)]],
			description: description[getRandomValue(description)]
		};
		cards.push(user);
	}
	return cards;
}
var p = generateData();

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
}

renderCards(p);

var userDialog = function (arr) {
	var userWindow = document.querySelector('.big-picture');
	userWindow.classList.remove('hidden');
	userWindow.querySelector('.big-picture__img').src = arr[0].url;
	userWindow.querySelector('.likes-count').textContent = arr[0].likes;
	userWindow.querySelector('.comments-count').textContent = arr[0].comments.length;
	var commentsCard = userWindow.querySelector('.social__comments');
	var listCard = makeElement('li', 'social__comment');
	listCard.classList.add('social__comment--text')
	var imageCard = makeElement('img', 'social__picture');
	imageCard.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
	imageCard.alt = 'Аватар комментатора фотографии';
	imageCard.width = '35';
	imageCard.height = '35';
	imageCard.textContent = arr[0].comments;
	listCard.appendChild(imageCard);
	commentsCard.appendChild(listCard);
	userWindow.querySelector('.social__caption').textContent = arr[0].description;
	userWindow.querySelector('.social__comment-count').classList.add('visually-hidden'); 
	userWindow.querySelector('.social__loadmore').classList.add('visually-hidden');
	return userWindow;
};

userDialog(p);
