import * as dotenv from 'dotenv'
dotenv.config()

const PRODUCT_IMG_UPLOAD_LOCATION = {
    STORAGE_LOCATION: './public/img/products/',
}

const PERSISTENCE_TYPES = {
    TYPE_MONGODB: 'MONGODB',
}

const config = {
    PORT: process.env.PORT,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB, 
    MONGODB_CONNECTION_STR: process.env.MONGODB_URI,
    MONGODB_TIMEOUT: 30000, 
}

const LANGUAGE_CONFIG = {
    DEFAULT_LANGUAGE : 'en',
    SUPPORTED_LANGUAGES:['en', 'es']
}

export {PERSISTENCE_TYPES, PRODUCT_IMG_UPLOAD_LOCATION, LANGUAGE_CONFIG, config as default};
