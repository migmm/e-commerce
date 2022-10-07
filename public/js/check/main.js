/////////////////////////////////////////////
//                                         //
//      ------ GO TO TOP BUTTON ------     //
//                                         //
/////////////////////////////////////////////

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


//FIXME: qty when add new product
//TODO: implement active link

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
            idInCart = parseInt(cart[i]['id']);
            idInElement = parseInt(idLoaded);
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



//////////////////////////////////////////////
//                                          //
//    ------ JS management in SPA ------    //
//                                          //
//////////////////////////////////////////////

const runScript = (content, id) => {
    // no cargar el <script> más de una vez
    if (document.getElementById(id)) {
        //Remove SRC in order to reload and not to be duplicated
        //Script does not work again when the view is changed
        var src = document.getElementById(id);
        src.remove();
      //  return;
    }
    const script = document.createElement('script');
    script.src = id;
    script.id = id;
    script.innerHTML = content;
    document.body.appendChild(script);
};

const getResource = async (url, callback) => {
    if (!url || typeof callback !== 'function') {
        return;
    }
    const response = await fetch(url);
    if (!response.ok) {
        return;
    }
    const responseContent = await response.text();
    callback(responseContent);
};



///////////////////////////////////////////////
//                                           //
//       ------ Template loading ------      //
//                                           //
///////////////////////////////////////////////
let templateURLFinal;
const main = document.querySelector('main');
const cachePages = {};

const getFullTemplateURL = function (link) {
    if (!link) {
        return '/home';
    }
    return `${link.getAttribute('href')}`
};

const getAsyncRequestFromLink = async (link, element) => {
    const templateURL = getFullTemplateURL(link);

    templateURLFinal = 'js' + templateURL + '.js'

    if (cachePages[templateURL] === undefined) {
        const template = await fetch(templateURL);
        cachePages[templateURL] = template.ok ? await template.text() : null;
    }
    if (cachePages[templateURL]) {
        element.innerHTML = cachePages[templateURL];

        async function test() {
            await new Promise(resolve => setTimeout(resolve, 1000));
            getResource(templateURLFinal, response => runScript(response, templateURLFinal) );
        }
        test();
    }
};

document.querySelector('.main-nav').addEventListener('click', e => {
    if (e.target.classList.contains('main-nav__link')) {
        e.preventDefault();
        e.target.blur();
        getAsyncRequestFromLink(e.target, main);
    }
});

getAsyncRequestFromLink('' , main);



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
        getAsyncRequestFromLink(e.target, main);
    }
});