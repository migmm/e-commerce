import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";
import unlink from "fs-extra";
import path from "path";


const productSchema = mongoose.Schema({

    productName: {
        type: Map,
        of: String,
    },
    price: {
        type: Map,
        of: Number,
    },
    tax: Number,
    vat: Number,
    discountPercent: Number,
    vendor: String,
    stock: Number,
    category: String,
    shortDescription: {
        type: Map,
        of: String,
    },
    longDescription: {
        type: Map,
        of: String,
    },
    freeShip: Boolean,
    ageFrom: Number,
    ageTo: Number,
    ageSelect: String,
    addedDate: Date,
    status: Boolean,
    lastSell: Date,
    lastModified: Date,
    images: Array,
    colors: Array,
    urlName: String,
},
    {
        versionKey: false
    }
);

const ProductsModel = mongoose.model('products', productSchema);


class ProductModelMongoDB {

    // CRUD - C: CREATE
    async createProduct(product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProduct = new ProductsModel(product);
            await newProduct.save();
            return DBMongoDB.getObjectWithId(newProduct.toObject());
        } catch (error) {
            console.error(`Error al intentar dar de alta el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readProducts(filters = {}, sortBy = 'productName', sortOrder = 'asc', page = 1, perPage = 10) {
        if (!await DBMongoDB.connectDB()) {
            return {
                products: [],
                totalPages: 0,
                totalProducts: 0,
            };
        }
    
        try {
            const skip = (page - 1) * perPage;
            perPage = parseInt(perPage);
    
            const aggregationPipeline = [];
    
            if (Object.keys(filters).length > 0) {
                if (filters._id) {
                    aggregationPipeline.push({ $match: { _id: mongoose.Types.ObjectId(filters._id) } });
                } else {
                    aggregationPipeline.push({ $match: filters });
                }
            }

            const sortingStage = { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } };
    
            const paginationStage = { $skip: skip };
            const limitStage = { $limit: perPage };
            const projectionStage = { $project: { __v: 0 } };
    
            aggregationPipeline.push(sortingStage, paginationStage, limitStage, projectionStage);
            const facetStage = {
                $facet: {
                    products: aggregationPipeline,
                    totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
                },
            };
            const result = await ProductsModel.aggregate([facetStage]).allowDiskUse(true);
            const productsWithId = result[0].products.map(product => DBMongoDB.getObjectWithId(product));
    
            return {
                products: productsWithId,
                totalPages: Math.ceil(result[0].totalCount[0].count / perPage),
                totalProducts: result[0].totalCount[0].count,
            };
        } catch (error) {
            console.error(`Error al intentar obtener los productos: ${error.message}`);
            return {
                products: [],
                totalPages: 0,
                totalProducts: 0,
            };
        }
    }
    
    
    
    
    

    async readProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const product = await ProductsModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error) {
            console.error(`Error al intentar obtener el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateProduct(id, product) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            /* 
            const productToUpdate = await ProductsModel.findById(id).lean() || {};

            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.portada)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.portada)) : console.log ("portada false"); ;
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria0)) : console.log ("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria1)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria1)) : console.log ("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + productToUpdate.images.galeria2)) ? unlink.remove(path.resolve('./public/' + productToUpdate.images.galeria2)) : console.log ("galeria2 false");
            */
            const updatedProduct = await ProductsModel.findByIdAndUpdate(id, { $set: product }, {
                returnDocument: 'after'
            }).lean();
            return DBMongoDB.getObjectWithId(updatedProduct);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteProduct(id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const productToDelete = await ProductsModel.findById(id).lean() || {};
            unlink.remove(path.resolve('./public/' + productToDelete.images.portada));

            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria0)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria0)) : console.log("galeria0 false");
            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria1)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria1)) : console.log("galeria1 false");
            await unlink.pathExists(path.resolve('./public/' + productToDelete.images.galeria2)) ? unlink.remove(path.resolve('./public/' + productToDelete.images.galeria2)) : console.log("galeria2 false");

            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedProduct);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto: ${error.message}`);
            return {};
        }
    }
}

export default ProductModelMongoDB;
