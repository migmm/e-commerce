import loginService from '../services/login.js';

class LoginController {

    async getLogin(id) {
        // console.log('getLogin:', id);
        const login = await loginService.getLogin(id);
        return login;
    }

    async getLogins() {
        // console.log('getLogins');
        const logins = await loginService.getLogins();
        return logins;
    }

    async postLogin(login, mode) {
        try {
            const postedLogin = await loginService.postLogin(login, mode);
            return postedLogin;
        } catch (error) {
            console.error('Error al realizar el postLogin:', error.message);
            return error;
            //throw error;
        }
    }

    async updateLogin(id, login, mode) {
        // console.log('updateLogin:', id, login);
        const updatedLogin = await loginService.updateLogin(id, login, mode);
        return updatedLogin;
    }

    async deleteLogin(id) {
        // console.log('deleteLogin', id);
        const deletedLogin = await loginService.deleteLogin(id);
        return deletedLogin;
    }
}

const loginController = new LoginController();
export default loginController;
