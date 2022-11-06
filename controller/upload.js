import express from 'express';
import multer from 'multer';
import ProductModelMongoDB from '../model/products/products-mongodb.js';
import api from '../api/products.js';
/////////////////////////////////////////////////
// START MULTER 

//const routerUpload = express.Router();

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

    const portada = req.files['avatar'][0];
    const galeria = req.files['gallery'];
    const data = req.body
    let locationName = storageLocation.substring(2);

 
    

    console.log(portada)

    if (portada) {
        if (galeria) {
            // console.log(req.file);
            var obj = {
                
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
                
                images: {
                    portada: locationName + portada.filename,
                    galeria0: locationName + galeria[0].filename,
                    galeria1: locationName + galeria[1].filename,
                   // galeria2: locationName + galeria[2].filename,
                },
                colors: data.colors
            }
            const newProduct = await api.createProduct(obj);
           // newProduct.save();
            res.json({
                images: {
                    portada: locationName + portada.filename,
                    galeria0: locationName + galeria[0].filename,
                    galeria1: locationName + galeria[1].filename,
                   // galeria2: locationName + galeria[2].filename,
            },
               // texto: text.dfsd
            })
            //res.send('<h1>¡Gracias!</h1><p>Archivo subido con éxito.</p>');
            // res.send({status: 'ok'});

        } else {
            var obj = {
                images: {
                    portada: locationName + portada.filename,
                    galeria0: locationName + galeria[0].filename,
                    galeria1: locationName + galeria[1].filename,
                   // galeria2: locationName + galeria[2].filename,
            },
                texto: text.dfsd
            }
            res.json({
                portada: locationName + portada.filename,
                texto: text.dfsd
            })
        }
    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
        // res.status(415).send({ error: 'Se produjo un error.' });
    }

}

///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postProduct = async (req, res) => {
    let product = req.body;
    const newProduct = await api.createProduct(product);
    res.json(newProduct);
};



const fieldConfig = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])

export default {
    postImages,
    fieldConfig
}