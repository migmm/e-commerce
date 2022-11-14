import Joi from "joi";
// https://joi.dev/api/?v=17.6.3

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
    
            // in case someone overrides frontend validations
            // same validations in frontend
            id: Joi.string(),
            productName: Joi.string().min(2).max(30).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            price: Joi.number().greater(-1).required(),
            discountPercent: Joi.number().greater(-1).required(),
            vendor: Joi.string().min(2).max(40).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            stock: Joi.number().integer().required(),
            category: Joi.string().min(2).max(50).pattern(new RegExp('^[A-Za-zÁáÉéÍíÓóÚúÑñ0-9.,\"\'\s\/_-].*$')).required(),
            shortDescription: Joi.string().min(2).max(80).required(),
            longDescription: Joi.string().min(2).max(200).required(),
            freeShip: Joi.boolean(),
            ageFrom: Joi.number().integer().greater(0).required(),
            ageTo:Joi.number().integer().greater(0).required(),
            ageSelect: Joi.number().required(),
            addedDate: Joi.date(),
            lastSell: Joi.date(),
            images: Joi.object(), // This is indiferent, files are managed with multer
            colors: Joi.array().required(),
        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
