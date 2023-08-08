//import favsService from '../services/favs.js';
import productController from '/js/controllers/product.js';
import toastComponent from '/js/utils/toast.js';
import render from '/js/utils/render.js';


class ModuleFavs {

    static favs = [];

    static favsFunctions() {

        const backgroundDark = document.querySelector('.background-dark');
        const favsPreview = document.querySelector('.favs-modal');
        let isFavsPreviewOpen = 0;

        function toggleFavs() {
            //backgroundDark.classList.toggle('background-dark--hidden');
            favsPreview.classList.toggle('favs-modal--opendrawer');
        }

        // ¯\_(ツ)_/¯
        document.addEventListener('click', e => {

            // Click on background dark and favs is closed
            if (e.target.classList.value === 'background-dark') {
                toggleFavs();
                isFavsPreviewOpen = 0;
                return;
            }

            // Click on favs button to show favs preview
            if (e.target.classList.value === 'fa fa-heart fa-lg') {
                toggleFavs();
                isFavsPreviewOpen = 1;
                console.log("fdfd")
                return;
            }

            /*           // Click on badge to show favs preview
                      if (e.target.classList.value === 'main-header__wrapper__favs-button-container__qty-favs') {
                          toggleFavs();
                          isFavsPreviewOpen = 1;
                          return;
                      }
           */
            /*         // Click on X button to close favs preview
                    if (e.target.classList.value === 'fa fa-times-circle-o fa-2x') {
                        toggleFavs();
                        isFavsPreviewOpen = 0;
                        return;
                    } */

            // Click on "Agregar al carrito"
            if (e.target.classList.value === 'fa fa-heart-o') {
                e.preventDefault();
                let id = e.target.getAttribute("data-id");
                console.log("ddd", id)
                this.addItemToFavs(id);
                return;
            }

            // Click on trash icon to delete product from favs
            if (e.target.classList.value === 'fa fa-trash-o') {
                e.preventDefault();
                let id = e.target.getAttribute('data-id');
                this.removeItemFromFavs(id)
                return;
            }

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

        try {
            const products = await productController.getProducts(currentLang);
            const product = products.find(product => product.id === id);
            const existingProductInFavs = this.favs.find(item => item.id === id);
            
            this.favs = JSON.parse(localStorage.getItem('favs')) || [];

            if (!existingProductInFavs) {
                const { id, productName, images, urlName } = product;

                const favProduct = {
                    id: id,
                    productName: productName,
                    image: images.portada,
                    urlName: urlName
                };
        
                this.favs.push(favProduct);

                localStorage.setItem('favs', JSON.stringify(this.favs));
                toastComponent.toastNotification('toast-added-to-favs', 'success', '#0FB681', 'center');
                this.updateFavs();
            } else {
                console.log("Ya existe en favoritos");
            }

            // Resto del código...
        } catch (error) {
            console.log(error);
        }
        


        //const productToRemoveId = this.favs.findIndex(product => product.id == id)




        /*  if (productToRemoveId >= 0) {
            this.favs[productToRemoveId].qty = this.favs[productToRemoveId].qty + qty;
            if (document.getElementsByClassName('checkout__products')[0]) {
                await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.checkout__products')
            } */
        //await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products')
        
        toastComponent.toastNotification('toast-added-to-favs', 'success', '#0FB681', 'center');
        this.updateFavs();
        const favsFromLocalStorage = JSON.parse(localStorage.getItem('favs'))
        console.log(favsFromLocalStorage)
        await render.renderTemplateCards(favsFromLocalStorage, 'templates/card-favs-preview.hbs', '.favs-modal__products')
        //return;
        /*  } */

        //this.favs.push(product);
        //this.favs[this.favs.length - 1].qty = 1;
        /*  
         if (document.getElementsByClassName('checkout__products')[0]) {
             await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.checkout__products')
         }*/
        /*  await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products')
         localStorage.setItem('favs', JSON.stringify(this.favs));
         toastComponent.toastNotification('toast-added-to-favs', 'success', '#0FB681', 'center'); 
         this.updateFavs(); */
    }

    static async removeItemFromFavs(id, qty) {

        const productToRemoveId = this.favs.findIndex(product => product.id == id)

        if (qty === 1) {
            --this.favs[productToRemoveId].qty;
            if (document.getElementsByClassName('checkout__products')[0]) {
                await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.checkout__products')
            }

            await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products')
            localStorage.setItem('favs', JSON.stringify(this.favs));
            toastComponent.toastNotification('toast-removed-from-favs', 'success', '#0FB681', 'center');
            this.updateFavs();
            return;
        }

        this.favs.splice(productToRemoveId, 1);
        if (document.getElementsByClassName('checkout__products')[0]) {
            await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.checkout__products')
        }
        await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products')
        localStorage.setItem('favs', JSON.stringify(this.favs));
        toastComponent.toastNotification('toast-removed-from-favs', 'success', '#0FB681', 'center');
        this.updateFavs();
    }

    static async updateFavs() {

        /*   const favsLoaded = await favsService.loadFavs();
  
              var index = favsLoaded.findIndex(item => item.userID === user);
              const userID = favsLoaded[index].id;
              savedFavs.userID = user;
              savedFavs.favsContent = this.favs;
              await favsService.updateFavs(savedFavs, userID); */
    }

    static async init() {
        this.favs = JSON.parse(localStorage.getItem('favs')) || [];
        await render.renderTemplateCards(this.favs, 'templates/card-favs-preview.hbs', '.favs-modal__products')
        this.updateFavs();
    }
}

export default ModuleFavs;
