'use strict'

var LIKES_MIN = 15;
var LIKES_MAX = 200;

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море.', 'Как же круто тут кормят.', 'Отдыхаем...', 
'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
'Вот это тачка!'];


function getRandomNumber (from, to) {
	return Math.floor((Math.random() * (to - from + 1)) + from);
};

function getRandomValue (arr) {
	return Math.floor(Math.random() * arr.length);
};

function getElements (element) {
	return document.querySelector(element);
};

var renderProfil = function () {
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
var p = renderProfil();

var renderCards = function (arr) {
	var pictures = getElements('.pictures');
	var pictureTemplate = getElements('#picture').content.querySelector('.picture__link');
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

renderCards(p);

