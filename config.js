import * as dotenv from 'dotenv'
dotenv.config()


const PERSISTENCE_TYPE = {
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: process.env.PORT,
    PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB, 
    MONGODB_CONNECTION_STR: `mongodb+srv://${process.env.DB_NAME}:${process.env.PASSWORD}@cluster0.mm8881o.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`,
    MONGODB_TIMEOUT: 3000, 
};

export {PERSISTENCE_TYPE, config as default};
