import http from '../clients/http.client.js';

class AuthService {
    
    URL_LOGIN = '/api/auth/login/';
    URL_REFRESH_TOKEN = '/api/auth/refresh/';
    URL_LOGOUT = '/api/auth/logout/';

/*     async getLogin(id) {
        const login = await http.get(this.URL_LOGIN, id);
        return login;
    }

    async getLogins() {
        const logins = await http.get(this.URL_LOGIN);
        return logins;
    } */

    async postLogin(login, mode) {
        try {
            const postLogin = await http.post(this.URL_LOGIN, login, mode);
            return postLogin;
        } catch (error) {
            throw error;
        }
    }

    async refreshToken() {
        try {
            const refreshToken = await http.post(this.URL_REFRESH_TOKEN);
            return refreshToken;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            const logout = await http.post(this.URL_LOGOUT);
            return logout;
        } catch (error) {
            throw error;
        }
    }

/*     async updateLogin(id, login, mode) {
        const updatedLogin = await http.put(this.URL_LOGIN, id, login, mode);
        return updatedLogin;
    }

    async deleteLogin(id) {
        const deletedLogin = await http.delete(this.URL_LOGIN, id);
        return deletedLogin;
    } */
}

const authService = new AuthService();

export default authService;
