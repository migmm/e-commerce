import config, {PERSISTENCE_TYPES} from '../../config.js';
import UserModelMem from './users-mem.js';
import UserModelFile from './users-fs.js';
import UserModelMongoDB from './users-mongodb.js';

class UserModel {
    static get(type) {
        console.log(`#### Persistencia -> ${config.PERSISTENCE_TYPE || 'por defecto'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MEM:
                return new UserModelMem();
            case PERSISTENCE_TYPES.TYPE_FILE:
                return new UserModelFile();
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new UserModelMongoDB();
            default:
                return new UserModelMem();
        }
    }
}

export default UserModel;
