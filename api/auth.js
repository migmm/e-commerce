import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
const users = [];

function createUser(username, email, password) {
    users.push({ username, email, password });
}

function authenticateUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return user;
}

function generateOTP(email) {
    const user = users.find(user => user.email === email);
    if (user) {
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        user.otp = otp;
        return otp;
    }
    return null;
}

function verifyOTP(email, otp) {
    const user = users.find(user => user.email === email);
    if (user && user.otp) {
        return user.otp === otp;
    }
    return false;
}

async function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        // Configura aquí tus credenciales y opciones de SMTP
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tu_correo@example.com',
            pass: 'tu_contraseña',
        },
    });

    const mailOptions = {
        from: 'tu_correo@example.com',
        to: email,
        subject: 'Código OTP',
        text: `Tu código OTP es: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
}


export default { createUser, authenticateUser, generateOTP, verifyOTP, sendOTPByEmail };
