import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class UserValidator {
    
    static validate(user) {

        const userSchema = Joi.object({

            // in case someone overrides frontend validations
            // same validations in frontend
            username: String,
            email: String,
            password: String,
            phone: String,
            photo: String,
            role: String,
            status: String,
            created_at: Date,
            otp: String,
            otpExpiration: Date,
            lastLogin: Date
        });

        const { error } = userSchema.validate(user);

        return error;
    }
}

export default UserValidator;
