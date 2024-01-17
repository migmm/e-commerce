import http from '/js/clients/http.client.js';

class RecoveryService {
    
    URL_SEND_TOKEN = '/api/reset/token';
    URL_SEND_PASSWORD =  '/api/reset/password';

    async passwordRecovery(email, mode) {
        const passwordRecovery = await http.post(this.URL_SEND_TOKEN, email, mode);
        return passwordRecovery;
    }

    async newPassword(password, token, mode) {
        const newPassword = await http.post(this.URL_SEND_PASSWORD + `/${token}`, password, mode);
        return newPassword;
    }
}


const recoveryService = new RecoveryService();

export default recoveryService;
