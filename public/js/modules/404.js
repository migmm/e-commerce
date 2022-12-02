console.log('🆗: Módulo Page404 cargado.');

class Page404 {

    static goToTopOnLoad() {
        const htmlTag = document.getElementsByTagName('html')[0];
        htmlTag.classList.remove('scroll-smooth');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        htmlTag.classList.add('scroll-smooth');
    }

    static async init () {
        console.log('Page404.init()');
        Page404.goToTopOnLoad();
    }
}

export default Page404;