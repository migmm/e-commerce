import config from '../config.js';
import UserModel from '../model/users/users.js';
import UserValidator from '../model/users/validators/UserValidator.js';
import OTPgenerate from '../helpers/otpGenerator.js';


const modelUsers = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getAuth = async (field, username) => {
    const user = await modelUsers.findByAny(field, username);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createAuth = async (user) => {

    const validationError = UserValidator.validate(user);

    if (!validationError) {
        const createdUser = await modelUsers.createUser(user);
        return createdUser;
    } else {
        console.log(validationError);
        console.error(`Error validating createUser: ${validationError.details[0].message}`);
        return {};
    }
};

async function generateOTP(email, method) {
    const user = await modelUsers.findByAny('email', email);

    if (!user) {
        return false;
    }

    const { otp, expirationTime } = OTPgenerate(method); // Llamar a OTPgenerate en lugar de generateOTP

    user.otp = otp;
    user.otpExpiration = expirationTime;

    const id = user.id;
    delete user.id;

    const validationError = UserValidator.validate(user);

    if (!validationError) {
        await modelUsers.updateUser(id, user);
        return otp;
    } else {
        console.log(validationError);
        console.error(`Error validating createUser: ${validationError.details[0].message}`);
        return false;
    }
}


async function verifyOTP(email, otp) {
    const user = await modelUsers.findByAny('email', email);

    if (!user) {
        return false;
    }

    if (user.otp !== otp) {
        return false;
    }

    if (user.otpExpiration && new Date() > user.otpExpiration) {

        user.otp = null;
        user.otpExpiration = null;
        const id = user.id;
        delete user.id;

        const validationError = UserValidator.validate(user);

        if (!validationError) {
            await modelUsers.updateUser(id, user);
            return false;
        } else {
            console.log(validationError);
            console.error(`Error validating createUser: ${validationError.details[0].message}`);
            return false;
        }
    }
    console.log(user)

    user.otp = null;
    user.otpExpiration = null;
    const id = user.id;
    delete user.id;

    const validationError = UserValidator.validate(user);

    if (!validationError) {
        await modelUsers.updateUser(id, user);
        return true;
    } else {
        console.log(validationError);
        console.error(`Error validating createUser: ${validationError.details[0].message}`);
        return false;
    }
}

export default {
    getAuth,
    createAuth,
    generateOTP,
    verifyOTP,
};