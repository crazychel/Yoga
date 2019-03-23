"use strict";

require("core-js/modules/es6.regexp.match");

function calc() {
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
}

module.exports = calc;