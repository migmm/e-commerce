// const {getProduct, getProducts} = require('../api/products');
import api from '../api/products.js';
import { PRODUCT_IMG_UPLOAD_LOCATION } from '../config.js';



////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    res.json(await api.getProducts());
};

const getProduct = async (req, res) => {
    const id = req.params.id;
    res.json(await api.getProduct(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////


const postProduct = async function (req, res, next) {

    const product = req.body;
    const files = req.files;
    const locationName = PRODUCT_IMG_UPLOAD_LOCATION.STORAGE_LOCATION.substring(9);

    product['images'] = {};

    try {
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

    if (files.gallery !== undefined) {

        const productImgGallery = req.files['gallery'];
        for (let i = 0; i <= productImgGallery.length; ++i) {
            if (productImgGallery[i] !== undefined) {
                product['images'][`${'galeria' + [i]}`] = locationName + productImgGallery[i].filename;
            }
        }
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
