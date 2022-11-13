// const {getProduct, getProducts} = require('../api/products');
import multer from 'multer';
import api from '../api/products.js';

const storageLocation = './public/img/products/';


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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const error = null;
        cb(error, storageLocation);
    },
    filename: function (req, file, cb) {
        const error = null;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
    }
});

const fileFilter = (req, file, cb) => {
    const validaMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const mimeTypeIsOk = validaMimeTypes.includes(file.mimetype);
    cb(null, mimeTypeIsOk);
};

const upload = multer({ storage, fileFilter });

const postProduct = async function (req, res, next) {

    const firstProductImg = req.files['avatar'][0];
    let productImgGallery = req.files['gallery'];
    const data = req.body

    var product = {

        productName: data.productName,
        price: data.price,
        discountPercent: data.discountPercent,
        vendor: data.vendor,
        stock: data.stock,
        category: data.category,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        freeShip: data.freeShip,
        ageFrom: data.ageFrom,
        ageTo: data.ageTo,
        ageSelect: data.ageSelect,
        addedDate: data.addedDate,
        lastSell: data.lastSell,
        colors: data.colors
    }

    let locationName = storageLocation.substring(9);
    product['images'] = {}

    if (firstProductImg !== undefined) {

        product['images']['portada'] = locationName + firstProductImg.filename;

        if (productImgGallery !== undefined) {

            for (let i = 0; i <= productImgGallery.length; ++i) {
                if (productImgGallery[i] !== undefined) {
                    product['images'][`${'galeria' + [i]}`] = locationName + productImgGallery[i].filename;
                }
            }
        }
        const newProduct = await api.createProduct(product);
        res.json(newProduct);

    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    }
}

const fieldConfig = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    if (req.file !== undefined) {
        const firstProductImg = req.files['avatar'][0];
        let productImgGallery = req.files['gallery'];

       // const data = req.body
    /*     const previousAvatar = data.images.prevAvatar;
        const previousGalleryImg0 = data.images.prevGallery0
        const previousGalleryImg1 = data.images.prevGallery1
        const previousGalleryImg2 = data.images.prevGallery2 */
        let locationName = storageLocation.substring(9);

        product['images'] = {}
        product['images']['portada'] = locationName + firstProductImg.filename;

        if (productImgGallery !== undefined) {

            for (let i = 0; i <= productImgGallery.length; ++i) {
                if (productImgGallery[i] !== undefined) {
                    product['images'][`${'galeria' + [i]}`] = locationName + productImgGallery[i].filename;
                }
            }
        }
    
        

    } /* else {
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
    fieldConfig,
};
