import ModuleFavs from '../modules/favs.js'

/**
 * Initializes the heart button functionality for all elements with the class 'heart-btn'.
 * The function adds a click event listener to each button, which toggles the favorite status
 * of the associated item by updating the button's data attribute and class, and by calling 
 * the appropriate methods from the ModuleFavs module.
 *
 * @function
 * @name heartButton
 * @returns {void}
 */
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
