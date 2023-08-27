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
    DEFAULT_LANGUAGE : 'en',
    SUPPORTED_LANGUAGES:['en', 'es']
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
export {PERSISTENCE_TYPES, PRODUCT_IMG_UPLOAD_LOCATION, LANGUAGE_CONFIG, s3Client,AWS_BUCKET_NAME, SEARCH_FIELDS, config as default};
