const heartButton = () => {
    const heartBtn = document.querySelectorAll('.heart-btn');

    heartBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const isFav = (this.dataset.fav === 'true');
            this.dataset.fav = !isFav;
            this.classList.toggle('clicked', !isFav);
        });
    });
}

export default heartButton;
