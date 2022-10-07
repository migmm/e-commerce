import mongoose from 'mongoose';
import config from '../config.js';

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

// Modelo del documento almacenado en la colección
const ProductsModel = mongoose.model('products', productSchema);

class ProductModelMongoDB {

    static connected = false;

    static async connectDB () {
        try {
            // await mongoose.connect('mongodb://localhost:27017/ecommerce');
            // await mongoose.connect('mongodb://localhost/ecommerce');
            await mongoose.connect(config.MONGODB_CONNECTION_STR, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: config.MONGODB_TIMEOUT
            });
            console.log('Conexión con MongoDB exitosa.');
            ProductModelMongoDB.connected = true;
        } catch (error) {
            console.error(`Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProduct (product) {
        if (!ProductModelMongoDB.connected) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error al intentar dar de alta el producto:', error.message);
            return {};
        }

    }


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    async readProducts () {
        if (!ProductModelMongoDB.connected) {
            return [];
        }
        try {
            const products = await ProductsModel.find({});
            return products;
        } catch (error) {
            console.error('Error al intentar leer los productos:', error.message);
            return [];
        }
        
    }

    async readProduct (id) {
        if (!ProductModelMongoDB.connected) {
            return {};
        }
        try {
            // const products = await ProductsModel.find({_id: id});
            // if (!products.length) {
            //     return {};
            // }
            // return products[0];
            // const product = await ProductsModel.findOne({_id: id}) || {};
            // return product;
            const product = await ProductsModel.findById(id) || {};
            return product;
        } catch (error) {
            console.error(`Error al intentar leer el producto #:${id}`, error.message);
        }
        return {};
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProduct (id, product) {
        if (!ProductModelMongoDB.connected) {
            return {};
        }
        try {
            // const updatedProduct = await ProductsModel.updateOne({_id: id}, {$set: product});
            // console.log('updatedProduct:', updatedProduct);
            
            // const updatedProduct = await ProductsModel.findOneAndUpdate({_id: id}, {$set: product});
            // const updatedProduct = await ProductsModel.findOneAndUpdate({_id: id}, {$set: product}, {
            //     returnDocument: 'after'
            // });
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, {$set: product}, {
                returnDocument: 'after'
            });
            return updatedProduct || {};
        } catch (error) {
            console.error(`Error al intentar actualizar el producto #:${id}`, error.message);
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProduct (id) {
        if (!ProductModelMongoDB.connected) {
            return {};
        }
        try {
            // await ProductsModel.deleteOne({_id: id});
            const deletedProduct = await ProductsModel.findByIdAndDelete(id) || {};
            return deletedProduct;
        } catch (error) {
            console.error(`Error al intentar eliminar el producto #:${id}`, error.message);
            return {};
        }
    }

}

export default ProductModelMongoDB;
