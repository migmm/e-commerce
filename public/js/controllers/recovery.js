import recoveryService from '../services/recovery.js';

class RecoveryController {

    async passwordRecovery(email, mode) {
        try {
            const passwordRecovery = await recoveryService.passwordRecovery(email, mode);
            return passwordRecovery;
        } catch (error) {
            console.error('Error doing postLogin:', error.message);
            return error;
        }
    }

    async sendNewPassword(password, token, mode) {
        try {
            const newPassword = await recoveryService.sendNewPassword(password, token, mode);
            return newPassword;
        } catch (error) {
            console.error('Error doing postLogin:', error.message);
            return error;
        }
    }
}

const recoveryController = new RecoveryController();
export default recoveryController;
