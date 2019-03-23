"use strict";

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

window.addEventListener('DOMContentLoaded', function () {
  'use srict';

  var tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  }); // таймер

  var deadline = '2019-03-20';

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / 1000 / 60 / 60);
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(id, endtime) {
    var timer = document.getElementById(id),
        hours = document.querySelector('.hours'),
        minutes = document.querySelector('.minutes'),
        seconds = document.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      var t = getTimeRemaining(endtime);

      if (t.hours < 0) {
        t.hours = '00';
      } else {
        if (t.hours < 10) {
          t.hours = '0' + t.hours;
        }
      }

      hours.textContent = t.hours;

      if (t.minutes < 0) {
        t.minutes = '00';
      } else {
        if (t.minutes < 10) {
          t.minutes = '0' + t.minutes;
        }
      }

      minutes.textContent = t.minutes;

      if (t.seconds < 0) {
        t.seconds = '00';
      } else {
        if (t.seconds < 10) {
          t.seconds = '0' + t.seconds;
        }
      }

      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('timer', deadline); //   Скролл
  // function setscroll(menuItem) {
  //     let menulink = document.querySelectorAll('ul li'),
  //         menu0 = 650,
  //         menu1 = 1932,
  //         menu2 = 4677,
  //         menu3 = 5291;
  //     for (let i = 0; i < menulink.length; i++) {
  //         menulink[i].addEventListener('click', function () {
  //             scrollTo(0, 650);
  //         });
  //         menuInterval = setInterval(scroll, 1000);
  //     }
  // }
  // setscroll();
  //   Modal

  var more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');
  more.addEventListener('click', modalOpen = function modalOpen() {
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });
  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });
  var detail = document.querySelectorAll('.description-btn');
  detail.forEach(function (item) {
    item.addEventListener('click', function () {
      modalOpen();
    });
  }); //Form

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
        } // End postData


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
  } // Slider


  var slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prew = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach(function (item) {
      return item.style.display = 'none';
    });
    dots.forEach(function (item) {
      return item.classList.remove('dot-active');
    });
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prew.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  }); // Calc

  var persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0;
  totalValue.innerHTML = 0;
  persons.addEventListener('input', function () {
    personsSum = +this.value;

    if (restDays.value == '' || persons.value == '' || valid(persons) == true) {
      totalValue.innerHTML = 0;
    } else {
      total = (daysSum + personsSum) * 4000;
      totalValue.innerHTML = total;
    }
  });
  restDays.addEventListener('input', function () {
    daysSum = +this.value;

    if (restDays.value == '' || persons.value == '' || valid(restDays) == true) {
      totalValue.innerHTML = 0;
    } else {
      total = (daysSum + personsSum) * 4000;
      totalValue.innerHTML = total;
    }
  });
  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      var a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });

  function valid(inNum) {
    if (inNum.value.match(/[,]?[.]/)) {
      return true;
    } else {
      return false;
    }
  }
});