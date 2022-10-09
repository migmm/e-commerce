const PERSISTENCE_TYPE = {
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,    // 'MEM', 'FILE', 'MONGODB'
    // MONGODB_CONNECTION_STR: 'mongodb://localhost/ecommerce',
    MONGODB_CONNECTION_STR: 'mongodb+srv://databaseincome:2f7bMvxGVSY5cgY@cluster0.mm8881o.mongodb.net/cosmica?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 3000,  // Valor bajo para TESTING
};

export {PERSISTENCE_TYPE, config as default};