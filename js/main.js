////////////////////
//                //
//    Products    //
//                //
////////////////////

const products = [
    {
        id: 1,
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
        images: [
            {
                img1: "img/products/61e7q+l8V4L._cpt_.jpg"
            }
        ]
    },
    {
        id: 2,
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
        images: [
            {
                img1: "img/products/51VnXrnisTL._spiderman_.jpg"
            }
        ]
    },
    {
        id: 3,
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
        images: [
            {
                img1: "img/products/71J-Aj+z75S._loki_.jpg"
            }
        ]
    },
    {
        id: 4,
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
        images: [
            {
                img1: "img/products/71uQJ6YnXGL._hulk_.jpg"
            }
        ]
    },
    {
        id: 5,
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
        images: [
            {
                img1: "img/products/81ec9J+H0XL._thorv_.jpg"
            }
        ]
    },
    {
        id: 6,
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
        images: [
            {
                img1: "img/products/61bMjFAlTAL._dr_.jpg"
            }
        ]
    },
    {
        id: 7,
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
        images: [
            {
                img1: "img/products/71yqh+-LzWL._chevy_.jpg"
            }
        ]
    },
    {
        id: 8,
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
        images: [
            {
                img1: "img/products/7180i9Z4MJL._datsun_.jpg"
            }
        ]
    },
    {
        id: 9,
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
        images: [
            {
                img1: "img/products/71PKix2trZL._minions_.jpg"
            }
        ]
    }
]



///////////////////////////////
//                           //
//      GO TO TOP BUTTON     //
//                           //
///////////////////////////////

// Get the button
var myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};



///////////////////////////
//                       //
//      Cart preview     //
//                       //
///////////////////////////

//FIXME: background wheel behavior when cart preview appears


const backgroundDark = document.querySelector('.background-dark');
const cartPreview = document.querySelector('.cart-modal');
const userLogin = document.querySelector('.login-button-menu')
const qtySelector = document.querySelector('.card__item-qty-selector')

let isCartPreviewOpen = false;


function toggleCart() {
    backgroundDark.classList.toggle('background-dark--hidden');
    cartPreview.classList.toggle('cart-modal--opendrawer');
}

// Click anywhere in webpage to open or close cart preview
document.addEventListener('click', e => {

    console.log(e.target.classList.value)
    if (e.target.classList.value === 'background-dark') {
        toggleCart();
        isCartPreviewOpen = 0;
        return;
    }

    // Click on cart button to show cart preview
    if (e.target.classList.value === 'fa fa-shopping-basket fa-lg') {
        toggleCart();
        isCartPreviewOpen = 1;
        return;
    }

      // Click on badge to show cart preview
    if (e.target.classList.value === 'main-header__wrapper__cart-button-container__qty-cart') {
        toggleCart();
        isCartPreviewOpen = 1;
        return;
    }


    // Click on X button to close cart preview
    if (e.target.classList.value === 'fa fa-times-circle-o fa-2x') {
        toggleCart();
        isCartPreviewOpen = 0;
        return;
    }

    // Click on button card_linK
    if (e.target.classList.value === 'card__link') {
        e.preventDefault();
        let id = e.target.getAttribute("data-id");
        let price = e.target.nextElementSibling.childNodes[7].childNodes[1].childNodes[1].innerHTML;
        let discount = e.target.nextElementSibling.childNodes[7].childNodes[3].childNodes[0].innerHTML;
        let shortDescription = e.target.nextElementSibling.childNodes[7].childNodes[9].innerHTML;
        let brand = e.target.nextElementSibling.childNodes[7].childNodes[5].innerHTML;
        let img = e.target.nextElementSibling.childNodes[5].childNodes[1].src;
        
        addItemToCart(id, price, discount, shortDescription, brand, img, 1)

        updateCart()
        console.log('ID', id)
        console.log('Price', price)
        console.log('Discount', discount)
        console.log('Short Description', shortDescription)
        console.log('Brand', brand)
        console.log('Img', img)

        return;
    }

    // Click on button user icon
    if (e.target.classList.value === 'fa fa-user fa-lg') {
        userLogin.classList.toggle("login-menu")
        return;
    }

    // Click on trash icon to delete item on cart preview
    if (e.target.classList.value === 'fa fa-trash-o') {
        e.preventDefault();
        let id = parseInt(e.target.getAttribute('data-id'));
        console.log('ID', id)
        removeItemToCart(id)
        updateCart()
        return;
    }

    // Click on plus to increase quantity
    if (e.target.classList.value === 'fa fa-plus') {

        btnPlus = e.target.previousElementSibling.value;
        btnPlus = parseInt(btnPlus) + 1;
        e.target.previousElementSibling.value = btnPlus;

        idLoaded = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute('data-id');

        for (var i = 0; i < cart.length; ++i) {
            idInCart = parseInt(cart[i]['id']);
            idInElement = parseInt(idLoaded);
            if (idInCart === idInElement) {
                cart[i]['qty'] = btnPlus;
                break;
            }
        }
        updateCart();
        return; 
    } 
    // Click on minus to decrease quantity
    if (e.target.classList.value === 'fa fa-minus') {
        btnMinus = e.target.nextElementSibling.value;
        if (btnMinus <= 1) {
            return;
        }
        btnMinus = parseInt(btnMinus) - 1;
        e.target.nextElementSibling.value = btnMinus;
        return;  
    }
});

// ESC key to close cart preview
document.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        if (isCartPreviewOpen) {
            toggleCart();
            isCartPreviewOpen = 0;
        }
        qtySelector.classList.toggle('card__item-qty-selector--show');
    }
});


/////////////////////////
//                     //
//    Shopping cart    //
//                     //
/////////////////////////

let cart = [];

cart.push({ 'id': 1, 'price': 5800, 'discount': 10, 'shortDescription': "Figura del Capitan america de 12 cm.", 'brand': "MARVEL", 'img': "img/61e7q+l8V4L._cpt_.jpg", 'qty': 1 });
cart.push({ 'id': 2, 'price': 5800, 'discount': 10, 'shortDescription': "Figura de Spiderman de 12 cm.", 'brand': "MARVEL", 'img': "img/51VnXrnisTL._spiderman_.jpg", 'qty': 2 });
cart.push({ 'id': 3, 'price': 5800, 'discount': 10, 'shortDescription': "Figura de Loki de 12 cm.", 'brand': "MARVEL", 'img': "img/71J-Aj+z75S._loki_.jpg", 'qty': 1 });
let qtyBadge = document.querySelector('.main-header__wrapper__cart-button-container__qty-cart');
addItemToCart(3, 5800, 10, 'Figura de Loki de 12 cm', 'MARVEL', 'img/71J-Aj+z75S._loki_.jpg', 1) 

//TODO: price
//TODO: qty view in preview
//TODO: qty selector in preview


function addItemToCart(id, price, discount, shortDescription, brand, img, qty) {

    id = parseInt(id)
    price = parseInt(price)
    discount = parseInt(discount)
    qty = parseInt(qty)
    console.log("fpasa por uni")
    // Check if exist
    for (var i = 0; i < cart.length; ++i) {
        console.log("item",cart[i].id )
        if (parseInt(cart[i]['id']) === id) {
            console.log("fpasa por dos")
            console.log("found")
            cart[i].qty = cart[i].qty + 1
            console.log("existe", cart)
            return
        }
    }
    cart.push({ 'id': id, 'price': price, 'discount': discount, 'shortDescription': shortDescription, 'brand': brand, 'img': img, 'qty': qty });
        console.log("no existe", cart)
        console.log("fpasa por tres")
}

function removeItemToCart(id) {

    // Check if exist
    for (var i = 0; i < cart.length; ++i) {
        if (cart[i]['id'] === id) {
            console.log("found")
            cart.splice(i, 1);
            console.log(cart)
            qtyBadge.innerHTML = parseInt(qtyBadge.innerHTML) - 1;
            break;
        }
    }

}

function updateCart() {

    let cartPreviewContent = document.querySelector('.cart-modal__products');
    let cartTotal = document.querySelector('.cart-total');
    cartTotal.innerHTML = 0;
    qtyBadge.innerHTML = 0;
    cartPreviewContent.innerHTML = '';

    for (var i = 0; i < cart.length; ++i) {

        qtyBadge.innerHTML = parseInt(qtyBadge.innerHTML) + parseInt(cart[i].qty);
        cartPreviewContent.innerHTML += 
        `
        <div class="card-cart-preview">

        <div class="card-cart-preview__image-container">
            <img src=${cart[i].img} alt="Producto" class="card-cart-preview__image">
        </div>

        <div class="card-cart-preview__content">
            <p class="card-cart-preview__description">${cart[i].shortDescription}</p>
            <div class="qty-selector-container">
            <i class="fa fa-minus" aria-hidden="true"></i>
                <input type="text" class="qty-selector-container__qty" value=${cart[i].qty}>
                <i class="fa fa-plus" aria-hidden="true"></i>
            </div>

        </div>

        <div class="card-cart-preview__price">
            <span class="card-cart-preview__price__price-currency">$<span
                class="card-cart-preview__price__price-value">${parseInt(cart[i].price) * parseInt(cart[i].qty)}</span>
            </span>

        </div>
            <i class="fa fa-trash-o" aria-hidden="true" data-id=${cart[i].id}></i>
        </div>
    `

        cartTotal.innerHTML = parseInt(cartTotal.innerHTML) + parseInt(cart[i].price) * parseInt(cart[i].qty);
    }


    

}

function loadCart() {

}

function saveCart() {

}

updateCart()
let qtySelectorManual = document.querySelector('.qty-selector-container__qty')
