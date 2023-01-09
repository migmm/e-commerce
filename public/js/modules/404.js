import cartController from '/js/modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';


class Page404 {

    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();
    }
}

export default Page404;