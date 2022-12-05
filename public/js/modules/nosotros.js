import cartController from '/js/modules/cart.js';

console.log('🆗: Módulo PageNosotros cargado.');

class PageNosotros  {

    static goToTopOnLoad() {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.classList.remove('scroll-smooth');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        htmlTag.classList.add('scroll-smooth');
    }

    static async init () {
        console.log('PageNosotros .init()');
        PageNosotros.goToTopOnLoad();
        await cartController.init();
    }
}

export default PageNosotros;
