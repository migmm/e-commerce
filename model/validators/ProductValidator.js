import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
/* 
            productName: Joi.string().min(2).max(30).required(),
            price: Joi.number().greater(0).required(),
            discountPercent: Joi.number().greater(0).required(),
            vendor: Joi.string().min(2).max(40).required(),
            stock: Joi.number().integer().required(),
            category: Joi.string().min(2).max(50).required(),
            shortDescription: Joi.string().min(2).max(80).required(),
            longDescription: Joi.string().min(2).max(200).required(),
            freeShip: Joi.boolean().required(),
            ageFrom: Joi.number().integer().required(),
            ageTo: Joi.number().integer().required(),
            addedDate: Joi.date().required(),
            lastSell: Joi.date().required(),
            images: Joi.object().required(),
            colors: Joi.array().required(),
             */

            productName: Joi.string().min(2).max(30).required(),
            price: Joi.number().greater(0).required(),
            discountPercent: Joi.number().greater(0).required(),
            vendor: Joi.string().min(2).max(40).required(),
            stock: Joi.number().integer().required(),
            category: Joi.string().min(2).max(50).required(),
            shortDescription: Joi.string().min(2).max(80).required(),
            longDescription: Joi.string().min(2).max(200).required(),
            freeShip: Joi.boolean().required(),
            ageFrom: Joi.number().integer().greater(0).required(),
            ageTo:Joi.number().integer().greater(0).required(),
            addedDate: Joi.date().required(),
            lastSell: Joi.date().required(),
            images: Joi.object().required(),
            colors: Joi.array().required(),
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
