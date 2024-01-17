import recoveryService from '../services/recoveryService.js';

class Recoverycontroller {

    async passwordRecovery(email, mode) {
        try {
            const passwordRecovery = await recoveryService.passwordRecovery(email, mode);
            return passwordRecovery;
        } catch (error) {
            console.error('Error al realizar el postLogin:', error.message);
            return error;
            //throw error;
        }
    }

    async newPassword(password, token, mode) {
        try {
            const newPassword = await recoveryService.newPassword(password, token, mode);
            return newPassword;
        } catch (error) {
            console.error('Error al realizar el postLogin:', error.message);
            return error;
            //throw error;
        }
    }
}

const recoverycontroller = new Recoverycontroller();
export default recoverycontroller;
