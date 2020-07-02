'use strict';

(function () {

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var wizards = [];

  var getWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizards = function (wizardsMagic) {
    var wizardElements = document.querySelectorAll('.setup-similar-item');
    if (wizardElements) {
      for (var i = 0; i < wizardElements.length; i++) {
        wizardElements[i].remove();
      }
    }

    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.wizardsCount; j++) {
      var wizardElement = getWizardElement(wizardsMagic[i]);
      fragment.appendChild(wizardElement);
    }
    wizardsList.appendChild(fragment);

  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardsList = document.querySelector('.setup-similar-list');
  window.backend.load('https://javascript.pages.academy/code-and-magick/data', successHandler, errorHandler);
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
  var startSetupPositionTop = '80px';
  var startSetupPositionLeft = '50%';
  var setupForm = document.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var changeWizardsCoat = window.debounce(
      function (evt) {
        evt.preventDefault();
        var wizardsCoatColor = window.data.getRandElementOfArray(window.data.WIZARD_COAT_COLORS);
        coatColor = wizardsCoatColor;
        wizardsCoat.style.fill = wizardsCoatColor;
        wizardsCoatInput.value = wizardsCoatColor;
        updateWizards();
      });

  var changeWizardsEyes = window.debounce(
      function (evt) {
        evt.preventDefault();
        var wizardsEyesColor = window.data.getRandElementOfArray(window.data.WIZARD_EYES_COLORS);
        eyesColor = wizardsEyesColor;
        wizardsEyes.style.fill = wizardsEyesColor;
        wizardsEyesInput.value = wizardsEyesColor;
        updateWizards();
      });

  var changeFireballColor = function (evt) {
    evt.preventDefault();
    var fireballColorToWizard = window.data.getRandElementOfArray(window.data.FIREBALL_COLORS);
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
    setup.style.top = startSetupPositionTop;
    setup.style.left = startSetupPositionLeft;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
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

  setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupForm), closePopup, errorHandler);
    evt.preventDefault();
  });

  window.setup = {
    setupDialogElement: setup
  };
})();
