function timer() {
    let deadline = '2019-03-24';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
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
    setClock('timer', deadline);
}

module.exports = timer;