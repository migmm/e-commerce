import authService from '../services/auth.js';

class Authcontroller {

    async postLogin(login, mode) {
        try {
            const postedLogin = await authService.postLogin(login, mode);
            return postedLogin;
        } catch (error) {
            console.error('Error doing postLogin:', error.message);
            return error;
        }
    }

    async refreshToken() {
        try {
            const refreshToken = await authService.refreshToken();
            return refreshToken;
        } catch (error) {
            console.error('Error doing refreshToken:', error.message);
            return error;
        }
    }

    async logout() {
        try {
            const logout = await authService.logout();
            return logout;
        } catch (error) {
            console.error('Error doing logout:', error.message);
            return error;
        }
    }
}

const authcontroller = new Authcontroller();
export default authcontroller;
