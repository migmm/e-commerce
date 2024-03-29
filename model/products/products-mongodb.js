import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB.js";


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
    views: Number,
    lastVisited: Date,
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
            const aggregationPipeline = this.buildAggregationPipeline(filters, sortBy, sortOrder, page, perPage);
            const result = await this.executeAggregationPipeline(aggregationPipeline);
            return this.formatAggregationResult(result, perPage);
        } catch (error) {
            console.error(`Error reading products: ${error.message}`);
            return {
                products: [],
                totalPages: 0,
                totalProducts: 0
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
            const deletedProduct = await ProductsModel.findByIdAndDelete(id).lean();
            return deletedProduct;
        } catch (error) {
            console.error(`Error al intentar eliminar el producto: ${error.message}`);
            return {};
        }
    }

    async executeAggregationPipeline(aggregationPipeline) {
        return await ProductsModel.aggregate(aggregationPipeline).allowDiskUse(true);
    }

    formatAggregationResult(result, perPage) {
        const productsWithId = result[0].products.map(product => DBMongoDB.getObjectWithId(product));
    
        return {
            products: productsWithId,
            totalPages: Math.ceil(result[0].totalCount[0].count / perPage),
            totalProducts: result[0].totalCount[0].count
        };
    }

    buildAggregationPipeline(filters, sortBy, sortOrder, page, perPage) {
        const skip = (page - 1) * perPage;
        const sortingStage = { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } };
        const paginationStage = { $skip: skip };
        const limitStage = { $limit: parseInt(perPage) }; // Convertir perPage a entero
        const projectionStage = { $project: { __v: 0 } };
    
        const aggregationPipeline = [];
        if (Object.keys(filters).length > 0) {
            if (filters._id) {
                aggregationPipeline.push({ $match: { _id: mongoose.Types.ObjectId(filters._id) } });
            } else {
                aggregationPipeline.push({ $match: filters });
            }
        }
        aggregationPipeline.push(sortingStage, paginationStage, limitStage, projectionStage);
    
        return [{ $facet: { products: aggregationPipeline, totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }] } }];
    }
}

export default ProductModelMongoDB;
