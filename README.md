![npm](https://img.shields.io/npm/v/npm?color=green)  ![npm](https://img.shields.io/npm/v/express?label=express&logo=Express)  ![GitHub package.json version](https://img.shields.io/github/package-json/v/migmm/e-commerce)  ![master](https://img.shields.io/github/last-commit/migmm/e-commerce)

[PARA LEER EN ESPAÑOL](https://github.com/migmm/e-commerce/blob/main/README-ES.md)
# Final Project
## Bootcamp FullStack Engineer from __EducaciónIT__ 
Final project emulating a e-commerce.


 <img src="https://github.com/migmm/e-commerce/blob/main/public/img/logocolor.png" alt="Logo"/>
 
 
Topic: Toy store.

Name: Juguetería Cósmica.

Deploy: [Glitch](https://cosmica-jugueteria.glitch.me/)


First delivery: 02/08/2022.

Second delivery: 26/09/2022.

Third delivery: 14/11/2022.

### Frontend

In frontend I used:

- HTML
- CSS
- Javascript
- SASS
- Handlebars
- BEM Architecture
- SPA system
- Responsive design / mobile first

### Backend

In Backend I used:

- Node.JS
- Express
- Mongoose
- MongoDB
- Layer architecture to improve scalability and fast learning


### FEATURES

    - Responsive design
    - Objects stored in a AWS bucket
    - Login limiter
    - OTP code generator
    - Multi language web and products
    - Multi currency products
    - Authentication and roles
    - Text with break lines in product description
    - Price calculation based on an external price API
    - Product list pagination and many options to get like vendor, date, product name and many others
    - Also you can choose product quantity per page
    - Password reset via link


### API ROUTES

##### Method GET
api/products/ ---> Gets All Products

api/products/:id ---> Get one product from ID

##### Method POST

api/products/ ---> Add new product (using form-data)

##### Method PUT

api/products/:id ---> Modify one product from ID (using form-data)

##### Method DELETE

api/products/:id ---> Delete one product from ID


### SWAGGER DOCUMENTATION

There is available a Swagger documentation at http://localhost:8080/api/docs/

If you are running outside a localhost Change http://localhost:8080 for your URL


### Installation

bash
### `npm install` 


or Yarn
### `yarn install` 


 In the project directory, you can run:
### `npm start`

To run the app:<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
