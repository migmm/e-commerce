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
            // Realiza acciones adicionales según sea necesario para manejar el error
            throw error; // Lanzar el error para que se pueda capturar y manejar en otros lugares si es necesario
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
