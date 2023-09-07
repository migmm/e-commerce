import api from '../api/products.js';
import { LANGUAGE_CONFIG } from '../config.js';
import { uploadImages, getSignedUrl, deleteImage } from '../helpers/awsFileManager.js';
const supportedLanguages = LANGUAGE_CONFIG.SUPPORTED_LANGUAGES;


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    const lang = req.params.lang;
    const queryParams = req.query;

    if (!lang || !supportedLanguages.includes(lang)) {
        return res.status(400).json({ error: 'Not a valid language' });
    }

    try {
        const fullProducts = await api.getProducts(lang, queryParams);
        if (!Array.isArray(fullProducts.products)) {
            return res.status(500).json({ error: 'Products data is not an array' });
        }

        const products = await Promise.all(
            fullProducts.products.map(async (product) => {
                if (Array.isArray(product.images)) {
                    const imageUrls = await Promise.all(
                        product.images.map(async (imageName) => {
                            /* const imageUrl = await getSignedUrl(imageName); */
                            const imageUrl = imageName; //this is for testing
                            return imageUrl;
                        })
                    );
                    return { ...product, images: imageUrls };
                } else {
                    return product;
                }
            })
        );

        res.json({
            page: fullProducts.page,
            perPage: fullProducts.perPage,
            totalProducts:fullProducts.totalProducts,
            totalPages: fullProducts.totalPages,
            products
        });
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining products' });
        console.log(error);
    }
};

const getProduct = async (req, res) => {
    const id = req.params.id;
    const lang = req.params.lang;

    if (!lang || !supportedLanguages.includes(lang)) {
        return res.status(400).json({ error: 'Not a valid language' });
    }

    try {
        const product = await api.getProduct(id, lang);

        const imageUrls = await Promise.all(
            product.images.map(async (imageName) => {
                const imageUrl = await getSignedUrl(imageName);
                return imageUrl;
            })
        );

        product.images = imageUrls;

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining product' });
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postProduct = async (req, res) => {
    const productData = req.body;
    const files = req.files;

    console.log("product data", productData)
    console.log("files", files)

    const productDetails = JSON.parse(productData.productData);

    try {
        const images = await uploadImages(files);
        const product = {
            ...productDetails,
            images
        }
        console.log(product)
        
        const newProduct = await api.createProduct(product);
        res.json(newProduct);
    }

    catch (err) {
        console.log(err)
        res.status(415).send({ error: 'Error adding new product' });
    } 
}


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const id = req.params.id;
    const newProductData = req.body;
    const files = req.files;

    try {
        const existingProduct = await api.getProductToUpdate(id);

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await Promise.all(
            existingProduct.images.map(async (oldImage) => {
                console.log(oldImage)
                await deleteImage(oldImage);
            })
        );

        const newImageUrls = await uploadImages(files);

        const updatedProductData = {
            ...existingProduct,
            ...newProductData,
            images: newImageUrls,
        };

        const updatedProduct = await api.updateProduct(id, updatedProductData);
        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
        console.log(error);
    }
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const removedProduct = await api.deleteProduct(id) || {};
        console.log(removedProduct)

        if (Array.isArray(removedProduct.images)) {
            await Promise.all(
                removedProduct.images.map(async (imageName) => {
                    await deleteImage(imageName);
                })
            );
        }
        res.status(204).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
        console.log(error);
    }
};


export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
};
