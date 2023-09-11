import productController from '/js/controllers/product.js';
import cartController from '/js/modules/cart.js';
import Validations from '../utils/validation.js';
import Form from '../utils/form.js';
import goTopOnLoad from '../utils/goTopOnLoad.js';
import generateId from '../utils/generateId.js';
import render from '/js/utils/render.js';
import fetchLanguageData from '../utils/langFunctions.js'
import { fetchAndRenderProducts, queryFunction } from '../utils/fetchAndRenderProducts.js';

class PageAlta {

    static form;
    static fields;

    static async saveProduct(product) {
        const mode = 'formdata';
        const savedProduct = await productController.saveProduct(product, mode);
        return savedProduct;
    }

/*     static async addFormEvents() {

        PageAlta.form.addEventListener('submit', async e => {
            e.preventDefault();

            document.getElementById('addedDate').value = new Date().toISOString();
            document.getElementById('lastSell').value = new Date('1900-01-01').toISOString();

            // Generate url name 
            let urlName = document.getElementById('urlName');
            const productName = document.getElementById('productName');
            urlName.value = productName.value + '-' + generateId.makeid(6);
            urlName.value = urlName.value.split(' ').join('-');
            console.log ("urlname" , urlName.value);

            // Free ship value adaptation to backend
            let freeShip = document.getElementById('freeShip');

            freeShip.value = false;
            if (freeShip.checked) {
                freeShip.value = 'true';
            }

            // Age select and year values adaptation to backend
            let ageYear = document.getElementById('ageYear');
            let ageSelect = document.getElementById('ageSelect');

            ageSelect.value = 0;

            if (ageYear.checked) {
                ageSelect.value = '1';
            }

            const productToSave = Validations.validateForm(PageAlta.fields);

            //Bypass to get the files too
            let dataProducts = new FormData(document.getElementById('form-add-products'));
            console.log(dataProducts);
            const colorsString = dataProducts.get('colors');
            dataProducts.delete('colors');
            dataProducts.delete('ageSelects');
            var colorsSplit = colorsString.split(',');
            colorsSplit.forEach((item) => dataProducts.append('colors[]', item))

            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(dataProducts);
                console.log('savedProduct:', savedProduct);
                Form.emptyForm(this.fields);
            }
        });

        const inputMultipleFiles = document.querySelector('.file-gallery');
        inputMultipleFiles.addEventListener('change', (e) => {
            const files = inputMultipleFiles.files;

            if (files.length > 3) {
                let ancest = inputMultipleFiles.closest('.input-group__form-group');
                let spanElement = ancest.querySelector('span:last-child')
                spanElement.style.visibility = 'visible';
                inputMultipleFiles.value = '';
                return;
            }
            spanElement.style.visibility = 'hidden';
        });
    } */

    static async init() {
        goTopOnLoad.goToTopOnLoad();
        //await fetchLanguageData.fetchLanguageData();
        // Empty constant to tell render that only show form
        const showOnly = null;
        const currentLang = 'es'

        const query = await queryFunction()
        await fetchAndRenderProducts([], '.input-group', 'templates/form.hbs');
        
        
        //await render.renderTemplateCards(showOnly, 'templates/form.hbs', '.input-group', currentLang)
        
        //this.form = document.getElementById('form-add-products');
      /*   this.fields = this.form.querySelectorAll(`textarea, input:not([type='radio']`); */
        /* this.addFormEvents(); */
        
        /* document.getElementById('productName').focus(); */
        await cartController.init();
        await fetchLanguageData.fetchLanguageData();



        const languages = {
            "en": "English",
            "es": "Español",
            "fr": "Frances"
        };

        const currencies = [
            "USD",
            "EUR"
        ];

        const formFields = [
            "productName",
            "shortDescription",
            "longDescription"
        ];

        const languageForms = document.getElementById("languageForms");
        const languageButtons = document.getElementById("languageButtons");
        const productInformation = document.getElementById("productInformation");

        const formData = {};
        const currencySelect = document.getElementById("currency");

        currencies.forEach(currency => {
            const option = document.createElement("option");
            option.value = currency.toLowerCase();
            option.textContent = currency;
            currencySelect.appendChild(option);
        });

        Object.keys(languages).forEach(langCode => {
            const button = document.createElement("button");
            button.textContent = languages[langCode];
            button.setAttribute("class", "language-button");
            button.setAttribute("data-lang", `form-language-button-${langCode}`);
            button.setAttribute("type", "button");
            button.addEventListener("click", function () {
                showFormForLanguage(langCode);
            });
            languageButtons.appendChild(button);
        });

        const formContainers = {};

        Object.keys(languages).forEach(langCode => {
            const formHtml = generateFormHtml(langCode, languages[langCode]);
            const formContainer = document.createElement("div");
            formContainer.classList.add(`form-container-${langCode}`);
            formContainer.style.display = "none";
            formContainer.innerHTML = formHtml;
            formContainers[langCode] = formContainer;
            languageForms.appendChild(formContainer);
        });

        function showFormForLanguage(langCode) {
            Object.keys(formContainers).forEach(code => {
                formContainers[code].style.display = (code === langCode) ? "block" : "none";
            });
        }

        function generateFormHtml(langCode, langName) {
            const formElements = formFields.map(field => {
                let inputElement;
                if (field === "shortDescription" || field === "longDescription") {
                    inputElement = `
                    <div class="input-group__form-group">
                        <label for="${field}_${langCode}">
                            <span data-lang="form-${separateCamelCase(field)}">${capitalize(field)}</span>
                            <span> (${langName}):</span>
                        </label>
                        <textarea class="input-group__textarea" id="${field}-${langCode}" name="${field}[${langCode}]" required></textarea><br>
                        <span class="input-group__error" data-lang="form-${field}-error">${field}</span>
                    </div>
                    `;
                } else {
                    inputElement = `
                    <div class="input-group__form-group">
                        <label for="${field}_${langCode}">
                            <span data-lang="form-${separateCamelCase(field)}">${capitalize(field)}</span>
                            <span> (${langName}):</span>
                        </label>
                        <input type="text" class="input-group__input" id="${field}-${langCode}" name="${field}[${langCode}]">
                        <span class="input-group__error" data-lang="form-${field}-error">${field}</span>
                    </div>
                    `;
                }
                return inputElement;
            }).join('');
        
            return `
                <form class="form-container-${langCode}">
                    ${formElements}
                </form>
            `;
        }

    /*    
        function generateFormHtml(langCode, langName) {
            const formElements = formFields.map(field => `
            <div class="input-group__form-group">
                <label for="${field}_${langCode}" class="input-group__label" >
                    <span data-lang="form-${separateCamelCase(field)}">${capitalize(field)}</span>
                    <span> (${langName}):</span>
                </label>
                <input type="text" class="input-group__input" id="${field}-${langCode}" name="${field}[${langCode}]">
                <span class="input-group__error" data-lang="form-${field}-error">${field}</span>
            </div>
            `).join('');
            return `
            <div class="form-container-${langCode}">
                ${formElements}
            </div>
            `;
        } */

        function capitalize(string) {
            const result = string.charAt(0).toUpperCase() + string.slice(1)
                .split(/(?=[A-Z])/)
                .join(' ');
            return result;
        }

        function separateCamelCase(string) {
            let result = string.split(/(?=[A-Z])/).join('-').toLowerCase();
            return result;
        }

        function collectFormData() {
            const productInfo = {};
            console.log("entra")
            formFields.forEach(field => {
                productInfo[field] = {};
                Object.keys(languages).forEach(langCode => {
                    const inputId = `${field}-${langCode}`;
                    const inputValue = document.getElementById(inputId).value;
                    productInfo[field][langCode] = inputValue;
                });
            });

            const priceValue = parseFloat(document.getElementById("price").value);
            const currencyValue = document.getElementById("currency").value;

            const priceObject = {
                [currencyValue]: priceValue
            };

            productInfo.price = priceObject;
            productInfo.currency = document.getElementById("currency").value;
            productInfo.tax = parseFloat(document.getElementById("tax").value),

                productInfo.vat = parseFloat(document.getElementById("vat").value);

            productInfo.vendor = document.getElementById("vendor").value;
            productInfo.stock = parseInt(document.getElementById("stock").value);
            productInfo.category = document.getElementById("category").value;
            productInfo.discountPercent = parseFloat(document.getElementById("discountPercent").value);
            productInfo.freeShip = document.getElementById("freeShip").checked;
            productInfo.ageFrom = parseInt(document.getElementById("ageFrom").value);
            productInfo.ageTo = parseInt(document.getElementById("ageTo").value);
            productInfo.ageSelect = document.querySelector('input[name="ageSelect"]:checked').value;

            productInfo.colors = selectedOptions;
            productInfo.addedDate = new Date();
            productInfo.lastSell = productInfo.lastSell = new Date("1900-01-01T00:00:00.000Z");
            productInfo.lastModified = productInfo.lastSell = new Date("1900-01-01T00:00:00.000Z");
            productInfo.urlName = document.getElementById("urlName").value;

            console.log(productInfo);
            const formData = new FormData();

            formData.append('productData', JSON.stringify(productInfo));

            const imagesInput = document.getElementById("images");

            for (const file of imagesInput.files) {
                formData.append("images", file);
            }

            for (let i = 0; i < totalImages.length; i++) {
                if (totalImages[i]) {
                    const file = dataURItoBlob(totalImages[i]);
                    formData.append('images', file);
                }
            }

            // check
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            fetch("http://localhost:8080/api/products/", {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Respuesta de la API:", data);
                })
                .catch(error => {
                    console.error("Error al enviar los datos:", error);
                });
        }

        showFormForLanguage('en');



        const optionSelect = document.getElementById('optionSelect');
        const addButton = document.getElementById('addButton');
        /*  const exportButton = document.getElementById('exportButton'); */
        const selectedOptionsContainer = document.getElementById('selectedOptions');
        const selectedOptions = [];
        const maxSelections = 3; // Establece el límite máximo de selecciones

        addButton.addEventListener('click', () => {
            const selectedValue = optionSelect.value;

            if (selectedValue !== '') {
                if (!selectedOptions.includes(selectedValue)) {
                    if (selectedOptions.length < maxSelections) {
                        selectedOptions.push(selectedValue);
                        updateSelectedOptionsUI();

                        optionSelect.value = '';
                    } else {
                        alert('Se ha alcanzado el límite máximo de selecciones.');
                    }
                } else {
                    alert('Esta selección ya ha sido agregada.');
                }
            }
        });

        /*    exportButton.addEventListener('click', () => {
               const jsonData = JSON.stringify(selectedOptions);
               console.log(jsonData); // Aquí puedes enviar jsonData al servidor o hacer lo que necesites
           });
    */
        function updateSelectedOptionsUI() {
            selectedOptionsContainer.innerHTML = '';
            selectedOptions.forEach((optionValue, index) => {
                const selectedOptionDiv = document.createElement('div');
                const selectedText = optionSelect.querySelector(`option[value="${optionValue}"]`).textContent;
                selectedOptionDiv.textContent = selectedText;
                selectedOptionDiv.classList.add('selected-option');

                const closeButton = document.createElement('button');
                closeButton.textContent = 'X';
                closeButton.classList.add('selected-option-close');
                closeButton.addEventListener('click', () => {
                    selectedOptions.splice(index, 1);
                    updateSelectedOptionsUI();
                });

                selectedOptionDiv.appendChild(closeButton);
                selectedOptionsContainer.appendChild(selectedOptionDiv);
            });
        }

        //--------------------------------------------------------------------------

        const endpointUrl = 'http://localhost:8080/api/products/';
        const cantidadImagenes = 4;
        const imageContainer = document.getElementById('imageContainer');
        const images = document.getElementById('images');
        let totalImages = new Array(cantidadImagenes).fill(null);
        let draggedIndex = null;


        // Generar los cuadros de imagen inicialmente
        for (let i = 0; i < cantidadImagenes; i++) {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('image-container');
            imageDiv.id = `image${i + 1}`;
            imageDiv.onclick = () => handleImageClick(i + 1);
            imageDiv.draggable = true;
            imageDiv.ondragstart = (event) => handleDragStart(event, i);
            imageDiv.ondragover = (event) => handleDragOver(event);
            imageDiv.ondrop = (event) => handleDrop(event, i);
            imageContainer.appendChild(imageDiv);
        }

        // Escuchar clic en contenedor de imagen
        function handleImageClick(index) {
            const container = document.getElementById(`image${index}`);
            if (container.style.backgroundImage) {
                removeImage(index);
            } else {
                images.click();
                images.onchange = function (event) {
                    handleFileSelect(event, index);
                };
            }
        }

        // Escuchar cambios en el input de archivo
        images.addEventListener('change', function (event) {
            handleFileSelect(event, null);
        });

        function handleFileSelect(event, index) {
            const files = event.target.files;
            let totalImagesLoaded = 0;
            let emptyContainers = [];

            // Buscar los contenedores vacíos
            for (let i = 0; i < totalImages.length; i++) {
                if (!totalImages[i]) {
                    emptyContainers.push(i);
                }
            }

            for (const file of files) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const imageData = event.target.result;

                    if (emptyContainers.length > 0) {
                        // Agregar la imagen al próximo contenedor vacío
                        const emptyContainerIndex = emptyContainers.shift();
                        totalImages[emptyContainerIndex] = imageData;
                        document.getElementById(`image${emptyContainerIndex + 1}`).style.backgroundImage = `url(${imageData})`;
                    } else {
                        alert('Se ha alcanzado el límite de imágenes permitidas.');
                    }

                    // Si se han cargado todas las imágenes, resetear el input para permitir cargar las mismas imágenes nuevamente
                    totalImagesLoaded++;
                    if (totalImagesLoaded === files.length) {
                        images.value = '';
                        // Guardar la imagen arrastrada como la primera en el input
                        if (draggedIndex !== null) {
                            const draggedImage = totalImages[draggedIndex];
                            totalImages.splice(draggedIndex, 1);
                            totalImages.unshift(draggedImage);
                            updateImageContainers();
                            draggedIndex = null;
                        }
                    }
                };

                reader.readAsDataURL(file);
            }
        }

        function removeImage(index) {
            totalImages[index - 1] = null;
            document.getElementById(`image${index}`).style.backgroundImage = '';
            // Reorganizar el array para mantener solo las imágenes válidas en las primeras posiciones
            totalImages = totalImages.filter(img => img !== null);
            // Rellenar con nulos para mantener la cantidad de imágenes permitidas
            totalImages = totalImages.concat(new Array(cantidadImagenes - totalImages.length).fill(null));
            updateImageContainers();
        }

        function handleDragStart(event, index) {
            draggedIndex = index;
        }

        function handleDragOver(event) {
            event.preventDefault();
        }

        function handleDrop(event, targetIndex) {
            event.preventDefault();
            if (draggedIndex !== null) {
                // Reordenar las imágenes
                const draggedImage = totalImages[draggedIndex];
                totalImages.splice(draggedIndex, 1);
                totalImages.splice(targetIndex, 0, draggedImage);
                updateImageContainers();
                draggedIndex = null;
            }
        }

        function updateImageContainers() {
            for (let i = 0; i < totalImages.length; i++) {
                const imageDiv = document.getElementById(`image${i + 1}`);
                imageDiv.style.backgroundImage = totalImages[i] ? `url(${totalImages[i]})` : '';
            }
        }

        function showImageOrder() {
            console.log(totalImages);
        }

        function submitForm(event) {
            event.preventDefault();

            const form = document.getElementById('galleryForm');
            const formData = new FormData(form);

            // Adjuntar los archivos al FormData
            for (let i = 0; i < totalImages.length; i++) {
                if (totalImages[i]) {
                    const file = dataURItoBlob(totalImages[i]);
                    formData.append('totalImages', file, `image${i + 1}.png`);
                }
            }

            // Realizar la solicitud fetch con FormData que contiene archivos
            fetch(endpointUrl, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                })
                .catch(error => {
                    console.error('Error al enviar el formulario:', error);
                });
        }

        // Convierte el formato de datos URI a Blob
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }


        const btnSubmit = document.getElementById('btn-sendform');
        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            collectFormData()
        });
    }
}

export default PageAlta;