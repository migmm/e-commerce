import express from 'express';
import multer from 'multer';
import multerConfig from  '../controller/upload.js';
/////////////////////////////////////////////////
// START MULTER 

const routerUpload = express.Router();

/* const storageLocation = './tmp/uploads/';

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

const postImages =  function (req, res, next) {

    const portada = req.files['avatar'][0];
    const galeria = req.files['gallery'];
    const text = req.body
    let locationName = storageLocation.substring(2);

    console.log(portada)

    if (portada) {
        if (galeria) {
            // console.log(req.file);
            res.json({
                images: {
                    portada: locationName + portada.filename,
                    galeria0: locationName + galeria[0].filename,
                    galeria1: locationName + galeria[1].filename,
                   // galeria2: locationName + galeria[2].filename,
            },
                texto: text.dfsd
            })
            //res.send('<h1>¡Gracias!</h1><p>Archivo subido con éxito.</p>');
            // res.send({status: 'ok'});
        } else {
            res.json({
                portada: locationName + portada.filename

            })
        }
    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
        // res.status(415).send({ error: 'Se produjo un error.' });
    }

}

const fieldConfig = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }]) */

routerUpload.post('/', multerConfig.fieldConfig, multerConfig.postImages);














//END MULTER
/////////////////////////////////////////////////





export default routerUpload;