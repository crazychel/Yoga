"use strict";

function modal() {
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
  });
}

module.exports = modal;