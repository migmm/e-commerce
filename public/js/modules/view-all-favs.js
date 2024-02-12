import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'
import render from '/js/utils/render.js';


class PageViewAllFavs {

    static favs = [];

    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
        this.favs = JSON.parse(localStorage.getItem('favs')) || [];
        await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-container');
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageViewAllFavs;