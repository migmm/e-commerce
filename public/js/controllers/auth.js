import authService from '../services/auth.js';

class Authcontroller {

/*     async getLogin(id) {
        // console.log('getLogin:', id);
        const login = await authService.getLogin(id);
        return login;
    }

    async getLogins() {
        // console.log('getLogins');
        const logins = await authService.getLogins();
        return logins;
    } */

    async postLogin(login, mode) {
        try {
            const postedLogin = await authService.postLogin(login, mode);
            return postedLogin;
        } catch (error) {
            console.error('Error al realizar el postLogin:', error.message);
            return error;
            //throw error;
        }
    }

    async refreshToken() {
        try {
            const refreshToken = await authService.refreshToken();
            return refreshToken;
        } catch (error) {
            console.error('Error al realizar el refreshToken:', error.message);
            return error;
            //throw error;
        }
    }

    async logout() {
        try {
            const logout = await authService.logout();
            return logout;
        } catch (error) {
            console.error('Error al realizar el logout:', error.message);
            return error;
            //throw error;
        }
    }
/* 
    async updateLogin(id, login, mode) {
        // console.log('updateLogin:', id, login);
        const updatedLogin = await authService.updateLogin(id, login, mode);
        return updatedLogin;
    }

    async deleteLogin(id) {
        // console.log('deleteLogin', id);
        const deletedLogin = await authService.deleteLogin(id);
        return deletedLogin;
    } */
}

const authcontroller = new Authcontroller();
export default authcontroller;
