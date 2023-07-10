/* import otpGenerator from 'otp-generator';
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
 */

import config from '../config.js';
import userModel from "../model/users/users.js";
//import userValidator from '../model/users/validators/userValidator.js';

const modelusers = userModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getusers = async () => {
    const users = await modelusers.readusers();
    return users;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getuser = async id => {
    const user = await modelusers.readuser(id);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createuser = async user => {

        const createduser = await modelusers.createuser(user);
        return createduser;  

        /*  const validationError = userValidator.validate(user);
        
        if(!validationError) {
            const createduser = await modelusers.createuser(user);
            return createduser;  
        } else {
            console.log(validationError);
            console.error(`Error de validación en createuser: ${validationError.details[0].message}`);
            return {};
        } */
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateuser = async (id, user) => {

    const updateduser = await modelusers.updateuser(id, user);
    return updateduser;   
    /*  const validationError = userValidator.validate(user);

    if(!validationError) {
        const updateduser = await modelusers.updateuser(id, user);
        return updateduser;    
    } else {
        console.log(validationError);
        console.error(`Error de validación en updateuser: ${validationError.details[0].message}`);
        return {};
    } */
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteuser = async id => {
    const removeduser = await modelusers.deleteuser(id);
    return removeduser;
};


export default {
    getusers,
    getuser,
    createuser,
    updateuser,
    deleteuser
};
