import productController from '/js/controllers/product.js';

/////////////////////////////////////////////
//                                         //
//      ------ GO TO TOP BUTTON ------     //
//                                         //
/////////////////////////////////////////////


var myButton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
    } else {
        myButton.style.display = "none";
    }
};

myButton.addEventListener('click', e => {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//      ------ GO TO TOP AND CLOSE MENU IN MOBILE MODE ON CHANGE VIEW ------     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

let checkMenu = document.querySelector('.main-nav-toggle');

function goToTopAndCloseMenu () {
    checkMenu.checked = false;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


async function renderTemplateCards(products, showTemplate = 'inicio') {
    console.log(products.length)
    const templates = `/templates/${showTemplate}.hbs`;
    const textoToRender = await fetch(templates).then(r => r.text());
    const template = Handlebars.compile(textoToRender);
    const html = template({ products });
    if (showTemplate === 'inicio') {
        document.querySelector('.latest-products').innerHTML = html;
        document.querySelector('.most-selled').innerHTML = html;
        document.querySelector('.latest-viewed').innerHTML = html;
    } else if (showTemplate === 'productos') {
        document.querySelector('.all-products').innerHTML = html;
    }
}

async function initInicio() {
    console.log('initInicio()');
    ////////////////////////////////
    //                            //
    //    //Pseudo hero slider    //
    //                            //
    ////////////////////////////////
     //-Need improvements-

    var slideIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > x.length) {slideIndex = 1}
        x[slideIndex-1].style.display = "block";
        setTimeout(carousel, 2000);
        x= false // Change image every 2 seconds
    }

    const products = await productController.getProducts();
    renderTemplateCards(products);

    console.log(`Se encontraron ${products.length} productos.`);
}

function initAlta() {
    console.log('initAlta()');
    document.getElementById("product-name").focus();
    goToTopAndCloseMenu ()
}

function initContacto() {
    console.log('initContacto()');
    document.getElementById("name").focus();
    goToTopAndCloseMenu ()
}

function initNosotros() {
    console.log('initNosotros()');
    goToTopAndCloseMenu ()
}

async function initProductos() {

    const products = await productController.getProducts();
    renderTemplateCards(products, 'productos');

    console.log(`Se encontraron ${products.length} productos.`);
    console.log('initProductos()');

}

class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method}).then(r => r.text());
    }

    getIdFromHash() {
        console.log(location.hash.slice(1))
        return location.hash.slice(1) || 'inicio';
    }

    getUrlFromId(id) {
        return `views/${id}.html`;
    }

    //FIXME: add class to active link
    setActiveLink (id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            // if (id === link.href.split('#')[1]) {
            if (id === link.id) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    initJS(id) {
        if (id === 'alta') {
            initAlta();
        } else if (id === 'inicio') {
            initInicio();
        } else if (id === 'contacto') {
            initContacto();
        } else if (id === 'nosotros') {
            initNosotros();
        } else if (id === 'productos') {
            initProductos();
        }

    }

    async loadTemplate(id) {
        const url = this.getUrlFromId(id);
        const view = await this.ajax(url);
        const main = document.querySelector('main');
        main.innerHTML = view;
        console.log(id)
        this.initJS(id);
    }

    async loadTemplates() {
        const id = this.getIdFromHash();
        this.setActiveLink(id);
        // await this.loadTemplate(id);
        this.loadTemplate(id);

        const links = document.querySelectorAll('.main-nav__link, .footer-column-container__link');
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const id = link.pathname.slice(1, (link.pathname.length - 5));
                console.log(id)
                location.hash = id;
            });
        });

        window.addEventListener('hashchange', async e => {
            const id = this.getIdFromHash();
            this.setActiveLink(id);
            // await this.loadTemplate(id);
            this.loadTemplate(id);
        });

    }

    start() {
        this.loadTemplates();
    }

}

const main = new Main();
main.start();


/////////////////////////////////////////
//                                     //
//      ------ Cart preview ------     //
//                                     //
/////////////////////////////////////////

//FIXME: background wheel behavior when cart preview appears

const backgroundDark = document.querySelector('.background-dark');
const cartPreview = document.querySelector('.cart-modal');
const userLogin = document.querySelector('.login-button-menu')
const qtySelector = document.querySelector('.card__item-qty-selector')
let cart = [];
let isCartPreviewOpen = false;
let idLoaded;
function toggleCart() {
    backgroundDark.classList.toggle('background-dark--hidden');
    cartPreview.classList.toggle('cart-modal--opendrawer');
}

// Click anywhere in webpage to open or close cart preview
// Beware of siblings gang !!!
// ¯\_(ツ)_/¯
document.addEventListener('click', e => {

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

    // You are about to enter to the sibling zone...
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
        removeItemToCart(id)
        updateCart()
        return;
    }

    // Click on plus to increase quantity
    if (e.target.classList.value === 'fa fa-plus') {

        let btnPlus = e.target.previousElementSibling.value;
        // btnPlus = parseInt(btnPlus) + 1;
        btnPlus = parseInt(btnPlus) 
        btnPlus++
        e.target.previousElementSibling.value = btnPlus;

        idLoaded = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute('data-id');

        for (var i = 0; i < cart.length; ++i) {
            let idInCart = parseInt(cart[i]['id']);
            let idInElement = parseInt(idLoaded);
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
        let btnMinus = e.target.nextElementSibling.value;
        if (btnMinus <= 1) {
            return;
        }
        btnMinus = parseInt(btnMinus)
        --btnMinus
        //btnMinus = parseInt(btnMinus) - 1;
        e.target.nextElementSibling.value = btnMinus;
        idLoaded = e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.getAttribute('data-id');
        for (var i = 0; i < cart.length; ++i) {
            let idInCart = parseInt(cart[i]['id']);
            let idInElement = parseInt(idLoaded);
            if (idInCart === idInElement) {
                cart[i]['qty'] = btnMinus;
                break;
            }
        }
        updateCart();
        return;  
    }
    
    //Clic on Keep Buyng
    if (e.target.classList.value === 'cart-modal__footer__link-keep')  {
        toggleCart();
        isCartPreviewOpen = 0;
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



///////////////////////////////////////
//                                   //
//    ------ Shopping cart ------    //
//                                   //
///////////////////////////////////////

let qtyBadge = document.querySelector('.main-header__wrapper__cart-button-container__qty-cart');

    //Fixes
    //FIXME: fix contact form layout
    //FIXME: fix error in ERROR in forms
    //FIXME: badge hover color
    
    //TODO: notification on add item and form errors
    //TODO: badge animation
    //TODO: async
    //TODO: open cart when add product

function addItemToCart(id, price, discount, shortDescription, brand, img, qty) {

    id = parseInt(id)
    price = parseInt(price)
    discount = parseInt(discount)
    qty = parseInt(qty)

    // Check if exist
    for (var i = 0; i < cart.length; ++i) {

        if (parseInt(cart[i]['id']) === id) {

            cart[i].qty = cart[i].qty + 1
            return
        }
    }
    cart.push({ 'id': id, 'price': price, 'discount': discount, 'shortDescription': shortDescription, 'brand': brand, 'img': img, 'qty': qty });

    saveCart()
    updateCart()
};

function removeItemToCart(id) {

    // Check if exist
    for (var i = 0; i < cart.length; ++i) {
        if (cart[i]['id'] === id) {
            cart.splice(i, 1);
            qtyBadge.innerHTML = parseInt(qtyBadge.innerHTML) - 1;
            break;
        }
    }
saveCart()
updateCart()
};

function updateCart() {

    let cartPreviewContent = document.querySelector('.cart-modal__products');
    let cartTotal = document.querySelector('.cart-total');
    cartTotal.innerHTML = 0;
    qtyBadge.innerHTML = 0;
    cartPreviewContent.innerHTML = '';
    let checkReveal = 0;

    for (var i = 0; i < cart.length; ++i) {

        checkReveal = checkReveal + parseInt(cart[i].qty);
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
            <span class="card-cart-preview__price__price-currency">Precio: $<span
                class="card-cart-preview__price__price-value">${parseInt(cart[i].price)}</span>
            </span>
            <span class="card-cart-preview__price__sub-price-currency">Subtotal: $<span
                class="card-cart-preview__price__price-value">${parseInt(cart[i].price) * parseInt(cart[i].qty)}</span>
            </span>
        </div>
            <i class="fa fa-trash-o" aria-hidden="true" data-id=${cart[i].id}></i>
        </div>
    `
        cartTotal.innerHTML = parseInt(cartTotal.innerHTML) + parseInt(cart[i].price) * parseInt(cart[i].qty);
    }

    if(parseInt(checkReveal) === 0){
        qtyBadge.classList.add("hidden")
        
    } else {
        qtyBadge.classList.remove("hidden")
    }
    
    saveCart()
};






//////////////////////////////////////////
//                                      //
//    ------ Session storage -------    //
//                                      //
//////////////////////////////////////////

if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
};

function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
};

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
};
updateCart()

document.querySelector('.main-nav').addEventListener('click', e => {
    if (e.target.classList.contains('main-nav__link')) {
        e.preventDefault();
        e.target.blur();
       // getAsyncRequestFromLink(e.target, main);
    }
});