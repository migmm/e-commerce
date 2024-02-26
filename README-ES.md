![npm](https://img.shields.io/npm/v/npm?color=green)  ![npm](https://img.shields.io/npm/v/express?label=express&logo=Express)  ![GitHub package.json version](https://img.shields.io/github/package-json/v/migmm/e-commerce)  ![master](https://img.shields.io/github/last-commit/migmm/e-commerce)

[ENGLISH VERSION](https://github.com/migmm/e-commerce/blob/main/README.md#) 

Proyecto integrador

## Bootcamp FullStack Engineer de __EducaciónIT__

Proyecto integrador que consiste en la creación de un e-commerce.

 <img src="https://github.com/migmm/e-commerce/blob/main/public/img/logocolor.png" alt="Logo"/>

Tema: juguetería.

Nombre: Juguetería Cósmica.

Deploy: [www.jugueteriacosmica.com.ar](https://www.jugueteriacosmica.com.ar/)

Deploy: [Glitch](https://massive-iridescent-iron.glitch.me/)

Primer entrega: 02/08/2022.

Segunda entrega: 26/09/2022.

Tercera entrega: 14/11/2022.


### Frontend

Para el frontend se utilizó:

- HTML
- CSS
- Javascript
- SASS
- Handlebars
- Arquitectura BEM
- Sistema SPA
- Diseño responsivo / mobile first


### Backend

Para el backend se utilizó:

- Node.JS
- Express
- Mongoose
- MongoDB
- Arquitectura en capas para una mejor escalabilidad y comprensión


### CARACTERISTICAS

    - Diseño responsivo
    - Objectos almacenados en AWS
    - Login limiter
    - Generador de codigos OTP
    - Web y productos multilenguaje
    - Multi moneda
    - Autenticacion y roles
    - Texto con saltos de linea en la descripcion del producto
    - Cálculo de precios basado en la cotizacion de una API externa
    - Paginación de productos con opciones de vendor, date, product name entre otros
    - También se puede seleccionar la cantidad de productos por página
    - Password reset via link


### Rutas API

##### Metodo GET
api/products/ ---> Recibe todos los productos

api/products/:id ---> Recibe un producto a partir de su ID

##### Metodo POST

api/products/ ---> Agrega un nuevo producto (usa form-data)

##### Metodo PUT

api/products/:id ---> Mmodifica un producto a partir de su ID (usa form-data)

##### Metodo DELETE

api/products/:id ---> Borra un producto a partir de su ID


### DOCUMENTACIÓN SWAGGER

Está disponible la documentacion en Swagger en http://localhost:8080/api/docs/

Si estas ejecuntando el proyecto en otra url diferente a localhost, cambiar http://localhost:8080 por tu URL


### INSTALACIÓN

```bash
npm install
```
o Yarn
```bash
yarn install 
```

 En la ubicación del proyecto ejecutar:

```bash
npm start
```

Para ver el proyecto:<br />
Abrir [http://localhost:8080](http://localhost:8080) para ver el e-commerce
