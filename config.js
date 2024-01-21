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
    region: process.env.AWS_REGION_,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

// S3 Bucket name
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

//Currencies configuration and api consumption
const CURRENCIES = {
    defaultCurrency: 'usd',
    getCurrencyChange: async () => {
        const data = await Promise.all([
            fetch("https://dolarapi.com/v1/dolares/oficial").then(response => response.json()),
            fetch("https://dolarapi.com/v1/cotizaciones/eur").then(response_1 => response_1.json())
        ]);
        const usdToArs = Number(data[0].venta);
        const eurToArs = Number(data[1].venta);

        const usdToEur = 1 / (eurToArs / usdToArs);
        const eurToUsd = 1 / usdToEur;
        return {
            usd: {
                ars: usdToArs.toFixed(2),
                eur: usdToEur.toFixed(2),
            },
            eur: {
                ars: eurToArs.toFixed(2),
                usd: eurToUsd.toFixed(2),
            },
            ars: {
                usd: (1 / usdToArs).toFixed(4),
                eur: (1 / eurToArs).toFixed(4),
            },
        };
    }
}

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
