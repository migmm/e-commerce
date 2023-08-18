//import favsService from '../services/favs.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/utils/toast.js';
import render from '/js/utils/render.js';


class ModuleFavs {

    static favs = [];

    static favsFunctions() {

        const favsPreview = document.querySelector('.favs-modal');
        let isFavsPreviewOpen = 0;

        function toggleFavs() {
            favsPreview.classList.toggle('favs-modal--opendrawer');
        }

        // ¯\_(ツ)_/¯
        document.addEventListener('click', e => {

            // Click on favs button to show favs preview
            if (e.target.classList.value === 'fa fa-heart fa-lg') {
                toggleFavs();
                if (isFavsPreviewOpen === 1) {
                    isFavsPreviewOpen = 0;
                    return;
                }
                isFavsPreviewOpen = 1;
                return;
            }

            // Click on trash icon to delete product from favs
            if (e.target.classList.value === 'fa fa-trash-o favs') {
                e.preventDefault();
                let id = e.target.getAttribute('data-id');
                this.removeItemFromFavs(id)
                return;
            }

            //Close with ESC key
            document.addEventListener('keydown', e => {
                if (e.key == 'Escape') {
                    if (isFavsPreviewOpen) {
                        toggleFavs();
                        isFavsPreviewOpen = 0;
                    }
                }
            });
        });
    }

    static async addItemToFavs(id) {
        const currentLang = localStorage.getItem('langSelection') || 'en';

        let query = `page=1&perPage=10&sortBy=addedDate&sortOrder=desc&field=_id&value=${id}`;
        const product = await productController.getProducts(currentLang, query);

        const existingProductInFavs = this.favs.find(item => item.id === id); 
        
        if (!existingProductInFavs && product) {
            const { id, productName, images, urlName, stock, status, price, freeShip } = product.products[0];

            const favProduct = {
                id: id,
                productName: productName,
                image: images.portada,
                urlName: urlName,
                status: status,
                price: price,
                stock: stock,
                freeShip: freeShip
            };

            this.favs.push(favProduct);

            localStorage.setItem('favs', JSON.stringify(this.favs));
            this.updateFavs();
        } else {
            toastComponent.toastNotification('toast-error-added-to-favs', 'success', '#0FB681', 'center');
        }

        this.updateFavs();
    }

    static async removeItemFromFavs(id) {
        const productToRemoveId = this.favs.findIndex(product => product.id == id);

        this.favs.splice(productToRemoveId, 1);
        localStorage.setItem('favs', JSON.stringify(this.favs));
        toastComponent.toastNotification('toast-removed-from-favs', 'success', '#0FB681', 'center');
        this.updateFavs();
    }

    static async updateFavs() {
        const currentLang = localStorage.getItem('langSelection') || 'en';
        const productsFromDatabase = await productController.getProducts(currentLang);
        console.log(productController)
        for (let i = 0; i < this.favs.length; i++) {
            const favProduct = this.favs[i];
            const matchingProduct = productsFromDatabase.products.find(product => product.id === favProduct.id);

            if (matchingProduct) {
                Object.assign(favProduct, matchingProduct);
            }
        }

        localStorage.setItem('favs', JSON.stringify(this.favs));
        await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products');
    }

    static async init() {
        this.favs = JSON.parse(localStorage.getItem('favs'));
        this.updateFavs();
    }
}

export default ModuleFavs;
