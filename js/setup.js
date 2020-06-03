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

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');
var wizards = generateRandomWizards(wizardsCount);
renderWizards(wizards);
var setupSimilarBlock = document.querySelector('.setup-similar');
setupSimilarBlock.classList.remove('hidden');
