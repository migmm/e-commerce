import express from 'express';
import cookieParser from 'cookie-parser';
import routerProducts from './router/products.js';
import routerCart from './router/cart.js';
import routerUsers from './router/users.js'
import routerAuth from './router/auth.js';
import langRouter from './router/lang.js';
import routerImages from './router/awsFileManager.js'
import cors from 'cors';

import config from './config.js';

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);
app.use('/api/users', routerUsers);
app.use('/api/auth', routerAuth);
app.use('/api/lang', langRouter);
app.use('/api/images', routerImages);

app.get("/*", function (req, res) {
    res.redirect("/#/404");
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));