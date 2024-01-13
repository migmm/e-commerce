import { S3 } from '@aws-sdk/client-s3';
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
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es']
}

// S3 configuration
const s3Client = new S3({
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const CURRENCIES = {
    defaultCurrency: 'usd',
    getCurrencyChange: {

        eur: {
            usd: 1.1,
            ars: 1.050,
        },
        usd: {
            eur: 1.05,
            ars: 1100,
        },
        ars: {
            eur: 0.91,
            usd: 1.10,
        },

    }

}
// S3 Bucket name
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

//Specify allowed fields to search in database when use query with params
const SEARCH_FIELDS = [
    'productName',
    'shortDescription',
    'longDescription',
    'category',
    'colors'
]

//Fields to used specifically with search in multiples langs
const FIELDS_WITH_LANG = [
    'productName',
    'shortDescription',
    'longDescription',
]

//Image resizing parameters
const IMAGE_RESIZE_PARAMETERS = {
    maxWidth: 1000,
    maxHeight: 1000,
    imageQuality: 50,
}

export { PERSISTENCE_TYPES, PRODUCT_IMG_UPLOAD_LOCATION, LANGUAGE_CONFIG, s3Client, AWS_BUCKET_NAME, SEARCH_FIELDS, FIELDS_WITH_LANG, IMAGE_RESIZE_PARAMETERS, CURRENCIES, config as default };
