import express from 'express';
import routerProducts from './router/products.js';
import routerCart from './router/cart.js';

import config from './config.js';

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);


app.get("/*", function (req, res) {
    res.redirect("/#/404");
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));