// const {getProduct, getProducts} = require('../api/products');
import api from '../api/products.js';
import { PRODUCT_IMG_UPLOAD_LOCATION } from '../config.js';
import { LANGUAGE_CONFIG } from '../config.js';

const supportedLanguages = LANGUAGE_CONFIG.SUPPORTED_LANGUAGES;


////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////


const getProducts = async (req, res) => {
    const lang = req.params.lang;

    if (!lang || !supportedLanguages.includes(lang)) {
        return res.status(400).json({ error: 'Not a valid language' });
    }

    try {
        const products = await api.getProducts(lang);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining products' });
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
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error obtaining product' });
    }
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////


const postProduct = async function (req, res, next) {
    try {
        if (req) {
            const product = req.body;
            const files = req.files;
            const locationName = PRODUCT_IMG_UPLOAD_LOCATION.STORAGE_LOCATION.substring(9);

            product['images'] = {};

            if (files.avatar !== 'undefined') {

                const firstProductImg = req.files['avatar'][0];
                const productImgGallery = req.files['gallery'];

                product['images']['portada'] = locationName + firstProductImg.filename;

                if (files.gallery !== undefined) {

                    for (let i = 0; i <= productImgGallery.length; ++i) {
                        if (productImgGallery[i] !== undefined) {
                            product['images'][`${'galeria' + [i]}`] = locationName + productImgGallery[i].filename;
                        }
                    }
                }

                const newProduct = await api.createProduct(product);
                res.json(newProduct);
            }
            /* } else {
                res.status(415).send('<h1>Se produjo un error.</h1>');
            } */
        }
    }

    catch (err) {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    }
}


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const files = req.files;
    const locationName = PRODUCT_IMG_UPLOAD_LOCATION.STORAGE_LOCATION.substring(9);

    try {
        if (files.avatar !== undefined) {

            const firstProductImg = req.files['avatar'][0];

            // const data = req.body
            /*     const previousAvatar = data.images.prevAvatar;
                const previousGalleryImg0 = data.images.prevGallery0
                const previousGalleryImg1 = data.images.prevGallery1
                const previousGalleryImg2 = data.images.prevGallery2 */

            /*  product['images'] = {} */

            product['images']['portada'] = locationName + firstProductImg.filename;
        }
    }
    catch {
        console.log("No se actualizó imágen de portada.")
    }

    try {
        if (files.gallery !== undefined) {

            const productImgGallery = req.files['gallery'];
            for (let i = 0; i <= productImgGallery.length; ++i) {
                if (productImgGallery[i] !== undefined) {
                    product['images'][`${'galeria' + [i]}`] = locationName + productImgGallery[i].filename;
                }
            }
        }
    }

    catch {
        console.log("No se actualizaron imágnes de galería.")
    }
    /*  else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    } */

    const updatedProduct = await api.updateProduct(id, product) || {};
    res.json(updatedProduct);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    const removedProduct = await api.deleteProduct(id) || {};
    res.json(removedProduct);
};

export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
};
