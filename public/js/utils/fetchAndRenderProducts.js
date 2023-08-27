import productController from '/js/controllers/product.js';
import render from '/js/utils/render.js';
const currentLang = localStorage.getItem('langSelection') || 'en';

//Queries params to render cards
const indexQueries = [
    {
        key: 'addedDate',
        label: '.cards-container',
        template: 'templates/card-row.hbs',
        value: ''
    },
    {
        key: 'lastSell',
        label: '.most-selled',
        template: 'templates/card-row.hbs',
        value: ''
    },
    {
        key: 'lastSell',
        label: '.latest-viewed',
        template: 'templates/card-row.hbs',
        value: ''
    }
];

async function fetchAndRenderProducts(query, targetSelector, template) {
    const products = await productController.getProducts(currentLang, query);
    await render.renderTemplateCards(products.products, template, targetSelector);
}

export {
    indexQueries,
    fetchAndRenderProducts
}