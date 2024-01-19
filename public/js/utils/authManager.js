import authController from '../controllers/auth.js';

class AuthManager {

    static decodeJWT(token) {
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    }

    async refreshAccessToken() {
        try {
            const login = await authController.refreshToken();
            if (login.status === 401) {
                window.location.href = '/#/login';
                return;
            }

            if (login.status === 201) {
                const decodedToken = AuthManager.decodeJWT(login.responseData.refreshToken);
                this.updateUserMenu(decodedToken.role);
            }

        } catch (error) {
            console.error('Error during refresh token:', error);
        }
    }

    updateUserMenu(role) {
        const menu = document.querySelector('.login-button-menu');
        let menuContent = '';

        if (role === 'user') {
            menuContent = `
                <a href="#/profile" class="panel-button-menu__panel-button" data-lang="signin">USER</a>
                <a href="#/logout" class="logout-button-menu__logout-button" data-lang="logout">Salir</a>
            `;
        } else if (role === 'admin') {
            menuContent = `
                <a href="#/profile" class="panel-button-menu__panel-button" data-lang="nav-bar-admin-button">ADMIN</a>
                <a href="#/logout" class="logout-button-menu__logout-button" data-lang="nav-bar-logout-button">Salir</a>
            `;
        }

        menu.innerHTML = menuContent;
    }

    getLogoutButton() {
        const logoutButton = document.getElementsByClassName('logout-button-menu__logout-button')[0];

        if (logoutButton) {
            logoutButton.addEventListener('click', e => {
                e.preventDefault();
                AuthManager.logout();
            });
        }
    }

    static async logout() {
        const logout = await authController.logout();

        if (logout.status === 204) {
            window.location.href = '/#/login';
        }
    }
}

const authManager = new AuthManager();

export default authManager;
