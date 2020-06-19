'use strict';
(function () {
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

  window.data = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    wizardsCount: 4,
    generateRandomWizards: generateRandomWizards,
    getRandElementOfArray: getRandElementOfArray
  };

})();
