import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class ItemValidator {
    
    static validate(item) {

        const itemSchema = Joi.object({
    
            // in case someone overrides frontend validations
/* 

            productID: Joi.string(),
            productName: Joi.string(),
            price: Joi.string(),
            shortDescription: Joi.string(),
            quantity: Joi.string(),
            discountPercent: Joi.string(),
            freeShip: Joi.string(),
            productLink: Joi.string()
 */
            /* 
            productName: Joi.string().min(2).max(30).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            price: Joi.number().greater(0).required(),
            discountPercent: Joi.number().greater(-1).required(),
            vendor: Joi.string().min(2).max(40).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            stock: Joi.number().integer().required(),
            category: Joi.string().min(2).max(50).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            shortDescription: Joi.string().min(2).max(80).required(),
            longDescription: Joi.string().min(2).max(200).required(),
            freeShip: Joi.boolean().required(),
            ageFrom: Joi.number().integer().greater(0).required(),
            ageTo:Joi.number().integer().greater(0).required(),
            addedDate: Joi.date().required(),
            lastSell: Joi.date().required(),
            images: Joi.object().required(),
            colors: Joi.array().required(),
            */

        });

        const { error } = itemSchema.validate(item);

        return error;
    }
}

export default ItemValidator;
