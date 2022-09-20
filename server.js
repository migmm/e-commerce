const express = require('express');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', '.\\views');


const products = [
    {
        id: 1011,
        productName: "CAPITAN AMERICA",
        price: 5800,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura del Capitan america de 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/61e7q+l8V4L._cpt_.jpg"
            }
        ]
    },
    {
        id: 1012,
        productName: "SPIDERMAN",
        price: 5700,
        discountPercent: 5,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Spiderman de 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/51VnXrnisTL._spiderman_.jpg"
            }
        ]
    },
    {
        id: 1013,
        productName: "LOKI",
        price: 5800,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Loki de 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/71J-Aj+z75S._loki_.jpg"
            }
        ]
    },
    {
        id: 1014,
        productName: "HULK",
        price: 5500,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Hulk de 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/71uQJ6YnXGL._hulk_.jpg"
            }
        ]
    },
    {
        id: 1015,
        productName: "THOR",
        price: 5800,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Thor 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/81ec9J+H0XL._thorv_.jpg"
            }
        ]
    },
    {
        id: 1016,
        productName: "DR STRANGE",
        price: 5800,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Dr Strange 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/61bMjFAlTAL._dr_.jpg"
            }
        ]
    },
    {
        id: 1017,
        productName: "IRONMAN",
        price: 6800,
        discountPercent: 10,
        vendor: "MARVEL",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Figura de Ironman de 12 cm.",
        longDescription: "",
        freeShip: true,
        ageFrom: 6,
        ageTo: 14,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/61mCRtz5u2L._LXXXV_.jpg"
            }
        ]
    },
    {
        id: 1011,
        productName: "CHEVY HOT WHEELS",
        price: 3400,
        discountPercent: 10,
        vendor: "HASBRO",
        stock: 10,
        category: "Autos Coleccionables",
        shortDescription: "Chevy HotWheels escala 1/20.",
        longDescription: "",
        freeShip: false,
        ageFrom: 8,
        ageTo: 15,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/71yqh+-LzWL._chevy_.jpg"
            }
        ]
    },
    {
        id: 1012,
        productName: "DATSUN HOT WHEELS",
        price: 3400,
        discountPercent: 10,
        vendor: "HASBRO",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Datsun HotWheels escala 1/20.",
        longDescription: "",
        freeShip: false,
        ageFrom: 8,
        ageTo: 15,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/7180i9Z4MJL._datsun_.jpg"
            }
        ]
    },
    {
        id: 1013,
        productName: "MINIONS HOT WHEELS",
        price: 3400,
        discountPercent: 10,
        vendor: "HASBRO",
        stock: 10,
        category: "Figuras Coleccionables",
        shortDescription: "Minions HotWheels escala 1/20",
        longDescription: "",
        freeShip: false,
        ageFrom: 8,
        ageTo: 15,
        addedDate: "2022-09-20T10:32:59+00:00",
        images: [
            {
                img1: "img/products/71PKix2trZL._minions_.jpg"
            }
        ]
    }
]

//Date and time uses ISO 8601

/* 
    products.push({id: 1009, productName: "MINIONS HOT WHEELS", price: 3400, discountPercent: 10, 
    vendor: "HASBRO", stock: 10, category: "Figuras Coleccionables", shortDescription: "Minions HotWheels escala 1/20", 
    longDescription: "", freeShip: false,  ageFrom: 8, ageTo: 15, addedDate: "2022-09-20T10:32:59+00:00", images: [{img1: "img/products/71PKix2trZL._minions_.jpg"}]});
*/

// let lastProductId = 0;
// let lastProductId = products.length;
let lastProductId = 50;

/* 
const routeNotFound = (req, res) => {
    const {url, method} = req;
    // res.send(`<h1 style="color: #933;">Ruta ${url} desde el método ${method} no implementada.</h1>`);
    res.render('error', {
        title: `Se produjo un error`,
        message: `Ruta ${url} desde el método ${method} no implementada.`
    });
}; 
*/

/////////////////////////////
//                         //
//    ------ GET ------    //
//                         //
/////////////////////////////

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/alta', (req, res) => {
    res.render('alta');
});

app.get('/nosotros', (req, res) => {
    res.render('nosotros');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

/*
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find( product => product.id === Number(id) );
    console.log(product);
    if (!product) {
        res.render('error', {title: 'Ufa!', message: 'No se encontró el producto...'});
        return;
    }
    res.render('product', product);
});
*/


//TODO: Implement error page
/* app.get('*', routeNotFound); */
app.get('*', (req, res) => {
    res.render('home');
});



///////////////////////////////////////
//                                   //
//    ------ SERVER THINGS ------    //
//                                   //
///////////////////////////////////////

const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
