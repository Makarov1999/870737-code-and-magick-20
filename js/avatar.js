'use strict';

(function () {
  var fileInput = document.querySelector('.upload input[type=file]');
  var avatarPreview = document.querySelector('.setup-user-pic');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var isMatch = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (isMatch) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);

    }
  });

})();
