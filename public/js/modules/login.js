import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class PageLogin {

    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
    }
}

export default PageLogin;