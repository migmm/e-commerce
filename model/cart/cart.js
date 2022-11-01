import config, {PERSISTENCE_TYPES} from '../../config.js';
import CartModelMem from './cart-mem.js';
import CartModelFile from './cart-fs.js';
import CartModelMongoDB from './cart-mongodb.js';

class CartModel {
    static get(type) {
        console.log(`#### Persistencia -> ${config.PERSISTENCE_TYPE || 'por defecto'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MEM:
                return new CartModelMem();
            case PERSISTENCE_TYPES.TYPE_FILE:
                return new CartModelFile();
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new CartModelMongoDB();
            default:
                return new CartModelMem();
        }
    }
}

export default CartModel;
