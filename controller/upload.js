
import multer from 'multer';

import api from '../api/products.js';


const storageLocation = './tmp/uploads/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const error = null;
        cb(error, storageLocation);
    },
    filename: function (req, file, cb) {
        // console.log(file);
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

const postImages = async function (req, res, next) {

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
        addedDate: data.addedDate,
        lastSell: data.lastSell,
        colors: data.colors
    }

    let locationName = storageLocation.substring(2);

    product['images'] = {}

    if (firstProductImg) {

        product['images']['portada'] = locationName + firstProductImg.filename;

        if (productImgGallery) {

            for (let i = 0; i <= productImgGallery.length; ++i) {

                if (productImgGallery[i] != undefined) {
                    product['images'][`${'galeria'+[i]}`] = locationName + productImgGallery[i].filename;
                }
            }

            const newProduct = await api.createProduct(product);
            res.json(product);
        }

    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
    }

}


const fieldConfig = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])

export default {
    postImages,
    fieldConfig
}