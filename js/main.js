//////////////////////////////
//                          //
//    Products Hardcoded    //
//                          //
//////////////////////////////

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

///////////////////////////////////////
//                                   //
//      SPA templates management     //
//                                   //
///////////////////////////////////////

// Load 'items-ui', 'main-header' and 'main-footer'
// into his own tag
const loadDefaultItems = ['items-ui', 'nav-bar', 'inicio', 'footer'];
const defaultItemsLocation = ['.items-ui', '.main-header', '.main-content', '.main-footer'];

for (var i = 0; i < loadDefaultItems.length; i++) {
    const xhr = new XMLHttpRequest();
    const url = `templates/${loadDefaultItems[i]}.html`;
    //Synchronous open to work correctly
    xhr.open('get', url, false);
    xhr.addEventListener('load', e => {
        if (e.target.status === 200) {
            let template = e.target.responseText;
            document.querySelector(defaultItemsLocation[i]).innerHTML = template;
        }
    });
    xhr.send();
}


/////////////////////////////////
//                             //
//      Pseudo hero slider     //
//                             //
/////////////////////////////////

// -Need improvements-
// FIXME: carousel detection out main page
var slideIndex = 0;
let homePage = false;

// Find main-slider div, if does not exist do nothing. 
homePage = document.getElementsByClassName('main-slider')[0];
console.log("fdf",homePage)
if (homePage) {
    carousel();
}

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
};


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


//////////////////////////////
//                          //
//      Form processing     //
//                          //
//////////////////////////////

let inputsText = document.querySelectorAll('input');

inputsText.forEach((input) => {
    input.addEventListener('input', function () {

        var val = this.value;
        console.log(val);
    });
});


//////////////////////////////////
//                              //
//       Template loading       //
//                              //
//////////////////////////////////

const main = document.querySelector('main');
const cachePages = {};
const getFullTemplateURL = link => `templates/${link.getAttribute('href')}`;

const getAsyncRequestFromLink = async (link, element) => {
    const templateURL = getFullTemplateURL(link);
    console.log(templateURL)
    if (cachePages[templateURL] === undefined) {
        console.log('no cacheado');
        const template = await fetch(templateURL);
        cachePages[templateURL] = template.ok ? await template.text() : null;
    }
    console.table(cachePages);
    if (cachePages[templateURL]) {
        element.innerHTML = cachePages[templateURL];
        if (templateURL === 'templates/inicio.html') {
            carousel();
        }
    }
};

document.querySelector('.main-nav').addEventListener('click', e => {
    if (e.target.classList.contains('main-nav__link')) {
        e.preventDefault();
        getAsyncRequestFromLink(e.target, main);
    }
});


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

    // Click on X button to close cart preview
    if (e.target.classList.value === 'cart-modal__btn-close') {
        toggleCart();
        isCartPreviewOpen = 0;
        return;
    }

    // Click on button card_linK
    if (e.target.classList.value === 'card__link') {
        e.preventDefault();
/*        
        let aa = e.target
       // aa.classList.toggle('card__item-qty-selector--show');
        console.log(e.target)
              let nS = document.querySelector(aa).nextSibling
                let nS1 = nS.nextElementSibling
                console.log(nS)
                console.log(nS1)
               // let sadsaas = e.target.classList.value.nextSibling
                nS1.classList.toggle('card__item-qty-selector--show');  */
        return;
    }

    // Click on button user icon
    if (e.target.classList.value === 'fa fa-user fa-lg') {
        userLogin.classList.toggle("login-menu")
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


// Import JSON does not work in FF 
/* import data from '../products.json' assert{type:'json'};
console.log(data); */


