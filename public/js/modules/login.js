import cartController from '../modules/cart.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import loginController from '../controllers/login.js';
//import Validations from '../utils/validation.js';

class PageLogin {

 static form
    static fields

    static async postLogin(product) {
        const mode = 'json';
        const savedProduct = await loginController.postLogin(product, mode);
        return savedProduct;
    }

    static async addFormEvents() {

        PageLogin.form.addEventListener('submit', async e => {
            e.preventDefault();

            const data = {};
            PageLogin.fields.forEach(field => {
                data[field.name] = field.value;
            });
    
            const mode = 'json';
            const login = await loginController.postLogin(data, mode);

            if (login.status === 201) {
                window.location.href = '/#/inicio';
            } else {

            }
    
            PageLogin.form.reset();
        });
    }


    static async init () {
        goTopOnLoad.goToTopOnLoad();
        await cartController.init();

        this.form = document.getElementById('form-login');
        this.fields = this.form.querySelectorAll(`input:not([type='radio']`);
        this.addFormEvents();
        
        document.getElementById('email').focus();
        await cartController.init();

    }
}

export default PageLogin;
