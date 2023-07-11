import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class UserValidator {
    
    static validate(user) {

        const userSchema = Joi.object({
    
            // in case someone overrides frontend validations
            // same validations in frontend
            
        });

        const { error } = userSchema.validate(user);

        return error;
    }
}

export default UserValidator;
