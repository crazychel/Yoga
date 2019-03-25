function calc() {

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function () {
        personsSum = +this.value;

        if (restDays.value == '' || restDays.value == '0' || persons.value == '' ||
            persons.value == '0' || valid(restDays) == true || valid(persons) == true) {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum) * 4000;
            totalValue.innerHTML = total * place.options[place.selectedIndex].value;
        }
    });

    restDays.addEventListener('input', function () {
        daysSum = +this.value;

        if (restDays.value == '' || restDays.value == '0' || persons.value == '' ||
            persons.value == '0' || valid(restDays) == true || valid(persons) == true) {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum) * 4000;
            totalValue.innerHTML = total * place.options[place.selectedIndex].value;
        }
    });

    place.addEventListener('change', function select() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    function valid(inNum) {
        if (inNum.value.match(/[\.\,]/)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = calc;