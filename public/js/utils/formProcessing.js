import generateId from '../utils/generateId.js';

const languages = {
    en: "English",
    es: "Español",
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

const config = {
    maxSelections: 3,
    imageQuantity: 4,
    showFormForLanguage: "en",

}


///////////////////////////////////////////////////////////////////////////////
//                                TEXT RELATED                               //
///////////////////////////////////////////////////////////////////////////////

let selectedOptionsContainer = null
const selectedOptions = [];
const maxSelections = config.maxSelections;

function initForm() {
    const languageForms = document.getElementById("languageForms");
    const languageButtons = document.getElementById("languageButtons");
    const currencySelect = document.getElementById("currency");

    const optionSelect = document.getElementById("optionSelect");
    const addButton = document.getElementById("addButton");
    selectedOptionsContainer = document.getElementById("selectedOptions");



    // Initialize currency select options
    currencies.forEach((currency) => {
        const option = createOptionElement(currency.toLowerCase(), currency);
        currencySelect.appendChild(option);
    });

    // Initialize language buttons
    Object.keys(languages).forEach((langCode) => {
        const button = createLanguageButton(langCode);
        languageButtons.appendChild(button);
    });

    // Initialize form containers
    const formContainers = {};
    Object.keys(languages).forEach((langCode) => {
        const formContainer = createFormContainer(langCode, languages[langCode]);
        formContainers[langCode] = formContainer;
        languageForms.appendChild(formContainer);
    });

    // Show form for the selected language
    showFormForLanguage(config.showFormForLanguage);

    // Add event listeners
    addButton.addEventListener("click", handleAddButtonClick);

    // Function to create an option element
    function createOptionElement(value, text) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        return option;
    }

    // Function to create a language button
    function createLanguageButton(langCode) {
        const button = document.createElement("button");
        button.textContent = languages[langCode];
        button.className = "language-button";
        button.setAttribute("data-lang", `form-language-button-${langCode}`);
        button.setAttribute("type", "button");
        button.addEventListener("click", () => showFormForLanguage(langCode));
        return button;
    }

    // Function to create a form container
    function createFormContainer(langCode, langName) {
        const formHtml = generateFormHtml(langCode, langName);
        const formContainer = document.createElement("div");
        formContainer.classList.add(`form-container-${langCode}`);
        formContainer.style.display = "none";
        formContainer.innerHTML = formHtml;
        return formContainer;
    }

    // Function to generate form HTML
    function generateFormHtml(langCode, langName) {
        return `
        
            ${formFields.map((field) => generateFormElement(field, langCode, langName)).join("")}
        
        `;
    }

    // Function to generate form elements
    function generateFormElement(field, langCode, langName) {
        const inputElement =
            field === "shortDescription" || field === "longDescription"
                ? generateTextareaElement(field, langCode, langName)
                : generateInputElement(field, langCode, langName);

        return `
        <div class="input-group__form-group">
            <label for="${field}_${langCode}">
                <span data-lang="form-product-${separateCamelCase(field)}">${capitalize(field)}</span>
                <span> (${langName}):</span>
            </label>
            ${inputElement}
            <span class="input-group__error" data-lang="form-${field}-error">${field}"</span>
        </div>
        `;
    }

    // Function to generate input element
    function generateInputElement(field, langCode) {
        return `<input type="text" class="input-group__input" id="${field}-${langCode}" name="${field}[${langCode}]">`;
    }

    // Function to generate textarea element
    function generateTextareaElement(field, langCode) {
        return `
        <textarea class="input-group__textarea" id="${field}-${langCode}" name="${field}[${langCode}]" required></textarea><br>
        `;
    }

    // Function to handle add button click
    function handleAddButtonClick() {
        const selectedValue = optionSelect.value;

        if (selectedValue !== "") {
            if (!selectedOptions.includes(selectedValue)) {
                if (selectedOptions.length < maxSelections) {
                    selectedOptions.push(selectedValue);
                    updateSelectedOptionsUI();
                    optionSelect.value = "";
                } else {
                    alert("Se ha alcanzado el límite máximo de selecciones.");
                }
            } else {
                alert("Esta selección ya ha sido agregada.");
            }
        }
    }

    // Helper function to capitalize a string
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).split(/(?=[A-Z])/).join(" ");
    }

    // Helper function to separate camel case
    function separateCamelCase(string) {
        return string.split(/(?=[A-Z])/).join("-").toLowerCase();
    }

    // Function to show form for a specific language
    function showFormForLanguage(langCode) {
        Object.keys(formContainers).forEach((code) => {
            formContainers[code].style.display = code === langCode ? "block" : "none";
        });
    }
}

// Function to update selected options UI
function updateSelectedOptionsUI() {
    selectedOptionsContainer.innerHTML = "";
    selectedOptions.forEach((optionValue, index) => {
        const selectedOptionDiv = createSelectedOptionDiv(optionValue);
        selectedOptionDiv.appendChild(createCloseButton(index));
        selectedOptionsContainer.appendChild(selectedOptionDiv);
    });
}

// Function to create selected option div
function createSelectedOptionDiv(optionValue) {
    const selectedOptionDiv = document.createElement("div");
    const selectedText = optionSelect.querySelector(`option[value="${optionValue}"]`).textContent;
    selectedOptionDiv.textContent = selectedText;
    selectedOptionDiv.classList.add("selected-option");
    return selectedOptionDiv;
}

// Function to create close button for selected option
function createCloseButton(index) {
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("selected-option-close");
    closeButton.addEventListener("click", () => {
        selectedOptions.splice(index, 1);
        updateSelectedOptionsUI();
    });
    return closeButton;
}

///////////////////////////////////////////////////////////////////////////////
//                               IMAGE RELATED                               //
///////////////////////////////////////////////////////////////////////////////

const imageQuantity = config.imageQuantity;
let totalImages = new Array(imageQuantity).fill(null);
let totalImagesLoaded = 0;

function initImageDriver() {

    const imageContainer = document.getElementById('imageContainer');
    const images = document.getElementById('images');

    let draggedIndex = null;

    for (let i = 0; i < imageQuantity; i++) {
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
        totalImages = totalImages.filter(img => img !== null);
        totalImages = totalImages.concat(new Array(imageQuantity - totalImages.length).fill(null));
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
            const draggedImage = totalImages[draggedIndex];
            totalImages.splice(draggedIndex, 1);
            totalImages.splice(targetIndex, 0, draggedImage);
            updateImageContainers();
            draggedIndex = null;
        }
    }
}

function updateImageContainers() {
    for (let i = 0; i < totalImages.length; i++) {
        const imageDiv = document.getElementById(`image${i + 1}`);
        imageDiv.style.backgroundImage = totalImages[i] ? `url(${totalImages[i]})` : '';
    }
}

///////////////////////////////////////////////////////////////////////////////
//                              FORM INFO COLLECT                            //
///////////////////////////////////////////////////////////////////////////////

function collectFormData() {
    const productInfo = {};
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
    productInfo.tax = parseFloat(document.getElementById("tax").value);
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

    const productName = productInfo.productName.en;
    productInfo.urlName = productName + '-' + generateId.makeid(6);
    productInfo.urlName = productInfo.urlName.split(' ').join('-').toLowerCase();
    console.log("urlname", productInfo.urlName);

    return productInfo;
}

function appendFiles(productInfo) {
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

    return formData;
}

function sendFullForm(formData) {
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

function resetForm() {
    formFields.forEach(field => {
        Object.keys(languages).forEach(langCode => {
            const inputId = `${field}-${langCode}`;
            document.getElementById(inputId).value = '';
        });
    });

    const numericFieldIds = ["price", "tax", "vat", "stock", "discountPercent", "ageFrom", "ageTo"];
    numericFieldIds.forEach(fieldId => {
        document.getElementById(fieldId).value = '';
    });

    document.getElementById("currency").selectedIndex = 0;
    document.getElementById("freeShip").checked = false;
    selectedOptions.length = 0;
    updateSelectedOptionsUI();

    const ageSelectInputs = document.querySelectorAll('input[name="ageSelect"]');
    ageSelectInputs.forEach(input => {
        input.checked = false;
    });

    totalImages = new Array(imageQuantity).fill(null);
    updateImageContainers();

    const imagesInput = document.getElementById("images");
    imagesInput.value = '';

    document.getElementById("vendor").value = '';
    document.getElementById("category").value = '';

    const firstInputId = `${formFields[0]}-${config.showFormForLanguage}`;
    document.getElementById(firstInputId).focus();
    
}

///////////////////////////////////////////////////////////////////////////////
//                                 SEND FORM                                 //
///////////////////////////////////////////////////////////////////////////////

function sendForm() {
    const productInfo = collectFormData();
    const formData = appendFiles(productInfo);
    sendFullForm(formData);
}

export default { initForm, initImageDriver, sendForm, resetForm }