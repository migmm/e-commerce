import http from '/js/clients/http.client.js';

class RecoveryService {
    
    URL_SEND_TOKEN = '/api/reset/token';
    URL_SEND_PASSWORD =  '/api/reset/password';

    async passwordRecovery(email, mode) {
        const passwordRecovery = await http.post(this.URL_SEND_TOKEN, email, mode);
        return passwordRecovery;
    }

    async sendNewPassword(newPassword, token, mode) {
        const sendNewPassword = await http.post(this.URL_SEND_PASSWORD + `/${token}`, newPassword, mode);
        return sendNewPassword;
    }
}


const recoveryService = new RecoveryService();

export default recoveryService;
