import ModuleFavs from '../modules/favs.js'

const heartButton = () => {
    const heartBtns = document.querySelectorAll('.heart-btn');

    heartBtns.forEach(function (btn) {
        const heartIcon = btn.querySelector('.fa-heart-o');
        const id = heartIcon.getAttribute('data-id');

        btn.addEventListener('click', function () {
            const isFav = (this.dataset.fav === 'true');

            if (isFav) {
                this.dataset.fav = false;
                this.classList.remove('clicked');
                ModuleFavs.removeItemFromFavs(id);
            } else {
                this.dataset.fav = true;
                this.classList.add('clicked');
                ModuleFavs.addItemToFavs(id);
            }
        });
    });
}

export default heartButton;
