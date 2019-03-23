"use strict";

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function form() {
  var massage = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };
  var form = document.querySelector('.main-form'),
      input = form.getElementsByTagName('input'),
      statusMassage = document.createElement('div'),
      img = document.createElement('img'),
      formContact = document.getElementById('form'),
      inputContact = formContact.getElementsByTagName('input');
  statusMassage.classList.add('status');

  function sendForm(elem, phone) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMassage);

      if (phonenumber(phone) == true) {
        var formData = new FormData(elem);

        function postData() {
          return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            var obj = {};
            formData.forEach(function (value, key) {
              obj[key] = value;
            });
            var json = JSON.stringify(obj);
            data = json;
            request.send(json);
            request.addEventListener('readystatechange', function () {
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState == 4) {
                resolve();
              } else {
                reject();
              }
            });
          });
        }

        function _clearInput() {
          phone.value = '';
          if (inputContact[1].value == '') inputContact[0].value = '';
        }

        postData(formData).then(function () {
          return statusMassage.innerHTML = massage.loading;
        }).then(function () {
          statusMassage.innerHTML = massage.success;
          img.src = "img/savedisk.png";
          elem.appendChild(img);
        }).catch(function () {
          return statusMassage.innerHTML = massage.failure;
        }).then(_clearInput);
      } else {
        img.src = "img/hold.png";
        elem.appendChild(img);
        statusMassage.innerHTML = 'Введите коректный номер телефона';
      }
    });
  }

  sendForm(formContact, inputContact[1]);
  sendForm(form, input[0]);

  function phonenumber(inputtxt) {
    var phoneNum = /^[\+]?[(]?[0-9]{3}[)]?[0-9]{6,9}$/im;

    if (inputtxt.value.match(phoneNum)) {
      return true;
    } else {
      return false;
    }
  }

  function clearInput() {
    for (var i = 0; i < inputContact.length; i++) {
      input[i].value = '';
      inputContact[i].value = '';
    }
  }
}

module.exports = form;