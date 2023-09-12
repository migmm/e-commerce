function initForm() {

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
                        <span data-lang="form-product-${separateCamelCase(field)}">${capitalize(field)}</span>
                        <span> (${langName}):</span>
                    </label>
                    <textarea class="input-group__textarea" id="${field}-${langCode}" name="${field}[${langCode}]" required></textarea><br>
                    <span class="input-group__error" data-lang="form-${field}-error">${field}"</span>
                </div>
                `;
            } else {
                inputElement = `
                <div class="input-group__form-group">
                    <label for="${field}_${langCode}">
                        <span data-lang="form-product-${separateCamelCase(field)}">${capitalize(field)}</span>
                        <span> (${langName}):</span>
                    </label>
                    <input type="text" class="input-group__input" id="${field}-${langCode}" name="${field}[${langCode}]">
                    <span class="input-group__error" data-lang="form-${field}-error">${field}"</span>
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
        productInfo.urlName = 'urlName';

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
    const selectedOptionsContainer = document.getElementById('selectedOptions');
    const selectedOptions = [];
    const maxSelections = 3;

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

    images.addEventListener('change', function (event) {
        handleFileSelect(event, null);
    });

    function handleFileSelect(event, index) {
        const files = event.target.files;
        let totalImagesLoaded = 0;
        let emptyContainers = [];

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
                    const emptyContainerIndex = emptyContainers.shift();
                    totalImages[emptyContainerIndex] = imageData;
                    document.getElementById(`image${emptyContainerIndex + 1}`).style.backgroundImage = `url(${imageData})`;
                } else {
                    alert('Se ha alcanzado el límite de imágenes permitidas.');
                }

                totalImagesLoaded++;
                if (totalImagesLoaded === files.length) {
                    images.value = '';
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
        totalImages = totalImages.filter(img => img !== null);
        totalImages = totalImages.concat(new Array(cantidadImagenes - totalImages.length).fill(null));
        updateImageContainers();
    }

    function updateImageContainers() {
        for (let i = 0; i < totalImages.length; i++) {
            const imageDiv = document.getElementById(`image${i + 1}`);
            imageDiv.style.backgroundImage = totalImages[i] ? `url(${totalImages[i]})` : '';
        }
    }

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


export default { initForm }