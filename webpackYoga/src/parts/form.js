function form() {

    let massage = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
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
                let formData = new FormData(elem);

                function postData() {

                    return new Promise((resolve, reject) => {

                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                        let obj = {};
                        formData.forEach(function (value, key) {
                            obj[key] = value;
                        });
                        let json = JSON.stringify(obj);
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

                function clearInput() {
                    phone.value = '';
                    if (inputContact[1].value == '') inputContact[0].value = '';
                }

                postData(formData)
                    .then(() => statusMassage.innerHTML = massage.loading)
                    .then(() => {
                        statusMassage.innerHTML = massage.success;
                        img.src = "img/savedisk.png";
                        elem.appendChild(img);
                    })
                    .catch(() => statusMassage.innerHTML = massage.failure)
                    .then(clearInput);

            } else {
                img.src = "img/hold.png";
                elem.appendChild(img);
                statusMassage.innerHTML = 'Введите коректный номер телефона';
            }
        });
    }

    sendForm(formContact, inputContact[1]);
    sendForm(form, input[0]);

    inputphone(formContact[1]);
    inputphone(input[0]);

    function inputphone(input) {
        input.onkeypress = function (e) {
            e = e || event;

            let chr = getChar(e);

            if (chr >= '0' && chr <= '9' || chr == '+') {
                return true;
            } else {
                return false;
            }

        }
    }

    function getChar(event) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which)
    }

    function phonenumber(inputtxt) {
        let phoneNum = /^[\+]?[(]?[0-9]{3}[)]?[0-9]{6,9}$/im;
        if (inputtxt.value.match(phoneNum)) {
            return true;
        } else {
            return false;
        }
    }

    function clearInput() {
        for (let i = 0; i < inputContact.length; i++) {
            input[i].value = '';
            inputContact[i].value = '';
        }
    }
}

module.exports = form;