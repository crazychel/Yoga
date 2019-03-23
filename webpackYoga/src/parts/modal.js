function modal() {
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


    more.addEventListener('click', modalOpen = function () {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let detail = document.querySelectorAll('.description-btn');

    detail.forEach(function (item) {
        item.addEventListener('click', () => {
            modalOpen();
        });
    });
}

module.exports = modal;