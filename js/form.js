'use strict';

window.form = (function () {
  var STEP_PLUS = 25;
  var STEP_MINUS = 25;

  var uploadFile = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  uploadFile.addEventListener('change', function () {
    openPopapEdit();
  });

  var openPopapEdit = function () {
    imgUpload.classList.remove('hidden');
    uploadFile.innerHTML = uploadFile.innerHTML;
    document.addEventListener('keydown', window.gallery.escPress);
  };

  var buttonCancel = document.querySelector('#upload-cancel');
  buttonCancel.addEventListener('click', window.gallery.close);


  var resize = document.querySelector('.img-upload__resize');
  var resizePlus = resize.querySelector('.resize__control--plus');
  var resizeMinus = resize.querySelector('.resize__control--minus');
  var resizeValue = resize.querySelector('.resize__control--value');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');

  resizePlus.addEventListener('click', function (evt) {
    if (evt.type === 'click' || (evt.type === 'keydown' && evt.keyCode === window.gallery.enterKey)) {
      resizeValue.value = Math.min(100, (parseInt(resizeValue.value, 10) + STEP_PLUS)) + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
    }
  });

  resizeMinus.addEventListener('click', function (evt) {
    if (evt.type === 'click' || (evt.type === 'keydown' && evt.keyCode === window.gallery.enterKey)) {
      resizeValue.value = Math.max(25, (parseInt(resizeValue.value, 10) - STEP_MINUS)) + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
    }
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

  var currentEffect = 'sepia';
  var imgUploadScale = imgUpload.querySelector('.img-upload__scale');
  var scaleInput = imgUploadScale.querySelector('input[name="effect-level"]');


  var changeEffectsElements = function (name) {
    imgUploadPreview.classList.remove.apply(imgUploadPreview.classList, effects);
    imgUploadPreview.classList.add(name);
  };

  var applyEffect = function () {

    changeEffectsElements('effects__preview--' + currentEffect);

    imgUploadScale.classList.remove('hidden');

    var value = parseFloat(scaleInput.value);

    if (currentEffect === 'chrome') {
      imgUploadPreview.style.filter = 'grayscale(' + value / 100 + ')';
    } else if (currentEffect === 'sepia') {
      imgUploadPreview.style.filter = 'sepia(' + value / 100 + ')';
    } else if (currentEffect === 'marvin') {
      imgUploadPreview.style.filter = 'invert(' + value + '%)';
    } else if (currentEffect === 'phobos') {
      imgUploadPreview.style.filter = 'blur(' + value / 100 * 3 + 'px)';
    } else if (currentEffect === 'heat') {
      imgUploadPreview.style.filter = 'brightness(' + (value / 100 * 2 + 1) + ')';
    } else if (currentEffect === 'none') {
      imgUploadScale.classList.add('hidden');
      imgUploadPreview.style.filter = 'none';
    }
  };

  var setValue = function (value) {
    dialogHandle.style.left = value + '%';
    scaleLevel.style.width = value + '%';
    scaleInput.value = value.toFixed(2);
  };

  var setEffect = function (name) {
    return function () {
      currentEffect = name;
      setValue(100);
      applyEffect();
    };
  };

  effectOrigin.addEventListener('click', setEffect('none'));

  effectChrom.addEventListener('click', setEffect('chrome'));

  effectSepia.addEventListener('click', setEffect('sepia'));

  effectMarvin.addEventListener('click', setEffect('marvin'));

  effectPhobos.addEventListener('click', setEffect('phobos'));

  effectHeat.addEventListener('click', setEffect('heat'));

  var hashTag = imgUpload.querySelector('.text__hashtags');

  var withUniq = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[j] === arr[i] && i !== j) {
          return false;
        }
      }
    }
    return true;
  };

  hashTag.addEventListener('input', function () {
    var tags = hashTag.value.split(' ');

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i].toLowerCase();
      if (tags.length > 5) {
        hashTag.setCustomValidity('Нельзя писать больше 5-ти хэш-тегов');
        hashTag.style.borderColor = 'red';
      } else if (!withUniq(tags)) {
        hashTag.setCustomValidity('Не может быть двух одинаковых хэш-тегов');
        hashTag.style.borderColor = 'red';
      } else if (tag[0] !== '#') {
        hashTag.setCustomValidity('Хэш-тег должен начинаться с #');
        hashTag.style.borderColor = 'red';
      } else if (tag.length < 2) {
        hashTag.setCustomValidity('Хэш-тег не должен быть короче 2 символов');
        hashTag.style.borderColor = 'red';
      } else if (tag.length > 20) {
        hashTag.setCustomValidity('Хэш-тег не должен превышать 20 символов');
        hashTag.style.borderColor = 'red';
      } else {
        hashTag.setCustomValidity('');
        hashTag.style.borderColor = 'green';
      }
    }
  });

  var commentsText = imgUpload.querySelector('.text__description');

  commentsText.addEventListener('input', function () {
    if (commentsText.value.length > 140) {
      commentsText.setCustomValidity('Комметарий не должен превышать 140 символов');
    } else {
      commentsText.setCustomValidity('');
    }
  });


  var scaleLine = imgUpload.querySelector('.scale__line');
  var dialogHandle = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  var clamp = function (min, max, value) {
    return Math.max(min, Math.min(max, value));
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    var sliderCoords = getCoords(scaleLine);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;
      var rightEdge = scaleLine.offsetWidth - (dialogHandle.offsetWidth / 2);
      var newLeft = clamp(0, rightEdge, startX - shiftX - sliderCoords.left);

      startX = moveEvt.clientX;

      setValue(newLeft / rightEdge * 100);
      applyEffect();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    upload: imgUpload
  };
})();
