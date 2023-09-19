import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import fetchLanguageData from '../utils/langFunctions.js'


class Page404 {

    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
        await fetchLanguageData.fetchLanguageData();
    }
}

export default Page404;