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

const queryFunction = async ( field='', value='', sortBy='addedDate', page=1, perPage=2, sortOrder='desc') => {
    const query = `page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&field=${field}&value=${value}`;
    return query;
}

const fetchAndRenderProducts = async (query, targetSelector, template) => {
    const products = await productController.getProducts(currentLang, query);
    await render.renderTemplateCards(products.products, template, targetSelector);
    return products;
}

export {
    indexQueries,
    fetchAndRenderProducts,
    queryFunction
}