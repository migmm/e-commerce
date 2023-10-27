import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'


class PageAdminPanel {

    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default PageAdminPanel;