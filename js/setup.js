'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var wizardsCount = 4;
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');

var getRandElementOfArray = function (array) {
  var randIndex = Math.floor(Math.random() * array.length);
  return array[randIndex];
};

var Wizard = function (name, coatColor, eyesColor) {
  this.name = name;
  this.coatColor = coatColor;
  this.eyesColor = eyesColor;
};

var generateRandomWizards = function (wizardsAmount) {
  var wizards = [];

  for (var i = 0; i < wizardsAmount; i++) {
    var name = getRandElementOfArray(WIZARD_NAMES) + ' ' + getRandElementOfArray(WIZARD_SURNAMES);
    var coatColor = getRandElementOfArray(WIZARD_COAT_COLORS);
    var eyesColor = getRandElementOfArray(WIZARD_EYES_COLORS);
    var wizard = new Wizard(name, coatColor, eyesColor);
    wizards.push(wizard);
  }

  return wizards;
};

var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = getWizardElement(wizards[i]);
    fragment.appendChild(wizardElement);
  }
  wizardsList.appendChild(fragment);

};

var setup = document.querySelector('.setup');
var wizards = generateRandomWizards(wizardsCount);
renderWizards(wizards);
var setupSimilarBlock = document.querySelector('.setup-similar');
var userNameInput = document.querySelector('.setup-user-name');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardsCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardsEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var wizardsCoatInput = document.querySelector('.setup-wizard-coat');
var wizardsEyesInput = document.querySelector('.setup-wizard-eyes');
var fireballColorInput = document.querySelector('.setup-fireball-color');
var wizardNameText = document.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var changeWizardsCoat = function (evt) {
  evt.preventDefault();
  var wizardsCoatColor = getRandElementOfArray(WIZARD_COAT_COLORS);
  wizardsCoat.style.fill = wizardsCoatColor;
  wizardsCoatInput.value = wizardsCoatColor;
};

var changeWizardsEyes = function (evt) {
  evt.preventDefault();
  var wizardsEyesColor = getRandElementOfArray(WIZARD_EYES_COLORS);
  wizardsEyes.style.fill = wizardsEyesColor;
  wizardsEyesInput.value = wizardsEyesColor;
};

var changeFireballColor = function (evt) {
  evt.preventDefault();
  var fireballColorToWizard = getRandElementOfArray(FIREBALL_COLORS);
  fireballColor.style.backgroundColor = fireballColorToWizard;
  fireballColorInput.value = fireballColorToWizard;
};

var openPopup = function () {
  setup.classList.remove('hidden');
  setupSimilarBlock.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardsCoat.addEventListener('click', changeWizardsCoat);
  wizardsEyes.addEventListener('click', changeWizardsEyes);
  fireballColor.addEventListener('click', changeFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setupSimilarBlock.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardsCoat.removeEventListener('click', changeWizardsCoat);
  wizardsEyes.removeEventListener('click', changeWizardsEyes);
  fireballColor.removeEventListener('click', changeFireballColor);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closePopup();
  }
});

wizardNameText.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});
