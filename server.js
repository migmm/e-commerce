import express from 'express';
import routerProducts from './router/products.js';
import routerCart from './router/cart.js';
import routerUpload from './router/upload.js';

// import ProductModelMongoDB from './model/products-mongodb.js';
import config from './config.js';

import multer from 'multer'
//const upload = multer({ dest: 'uploads/' })
// await ProductModelMongoDB.connectDB();
// ProductModelMongoDB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);
app.use('/upload', routerUpload);



/////////////////////////////////////////////////
// START MULTER 





//import express from 'express';
//import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const error = null;
        cb(error, './tmp/uploads');
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

const upload = multer({ storage, fileFilter});

//const app = express(); 
// app.use(express.static('public', { extensions: ['html', 'htm'] }));
//import ProductModel from "./model/products/products.js";



















//END MULTER
/////////////////////////////////////////////////




const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
