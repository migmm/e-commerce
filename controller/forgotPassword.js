import bcrypt from 'bcrypt';
import api from '../api/users.js';


const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await api.getByField('email', email);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const token = generateRandomToken(64);

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 3600000 ms  --> 1 hour
        const id = user.id;
        delete user.id;
        await api.updateUser(id, user);

        /*  const mail = {
             to: user.email,
             subject: 'Password Reset',
             html: `<p>Click in follow link to reset your password: <a href="${url}/reset-password/${resetToken}">Reset Password</a></p>`
         }; */

        //Send mail

        res.json({ message: 'Password reset link has been sended to your mail.' });
    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await api.getByField('resetToken', token);
        console.log("userfound", user)

        if (!user || user.resetTokenExpiration <= Date.now()) {
            return res.status(400).json({ message: 'Error: Invalid or expired token.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;

        const id = user.id;
        delete user.id;
        await api.updateUser(id, user);

        res.status(200).json({ message: 'Password restored.' });
    } catch (error) {
        next(error);
    }
}

const generateRandomToken = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        token += chars[randomIndex];
    }

    return token;
};


export default {
    forgotPassword,
    resetPassword
}