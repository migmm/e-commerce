const languageSelect = document.querySelectorAll('.language-select');

/*
 * This function updates DOM elements with provided translation data.
 * It takes an object containing translation data and an optional parent key for recursion.
 * @param {Object} elementData - The translation data object.
 * @param {string} [parentKey=""] - The optional parent key for recursion.
 * @returns {void}
 */
const updateElements = (elementData, parentKey = "") => {
    const elementsToUpdate = [];

    // Recursive function to traverse translation data
    const traverseData = (data, parentKey = "") => {
        Object.entries(data).forEach(([key, value]) => {
            const elementKey = parentKey ? `${parentKey}-${key}` : key;

            if (typeof value === 'object') {
                traverseData(value, elementKey);
            } else {
                const elements = document.querySelectorAll(`[data-lang="${elementKey}"]`);
                elements.forEach((element) => {
                    elementsToUpdate.push({ element, value });
                });
            }
        });
    };

    // Start traversing translation data
    traverseData(elementData);

    // Update DOM elements with translation data
    elementsToUpdate.forEach(({ element, value }) => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = value;
        } else {
            element.innerHTML = value;
            element.title = value;
            element.alt = value;
        }
    });
};

/*
 * This function makes a data request to the server using fetch API.
 * It takes the request route and the HTTP method to use.
 * Returns a promise that resolves with the obtained data.
 * @param {string} route - The route for the data request.
 * @param {string} method - The HTTP method for the request.
 * @returns {Promise<Object>} - A promise resolving to the obtained data.
 */
const fetchFunction = async (route, method) => {
    try {
        const response = await fetch(route, { method });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data.', error);
        throw error;
    }
};

/*
 * This function retrieves translation data from the server and updates the DOM with it.
 * It also handles user language selection.
 * Returns a promise that resolves with the obtained translation data.
 * @returns {Promise<Object>} - A promise resolving to the obtained translation data.
 */
const fetchLanguageData = async () => {
    const availableLangs = await fetchFunction('/api/lang/availablelangs', 'GET');
    const supportedLanguages = availableLangs.availableLangs;

    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageParts = browserLanguage.split("-");
    const language = languageParts[0];
    let defaultLanguage = supportedLanguages.includes(language) ? language : 'en';

    if (localStorage.getItem('langSelection')) {
        defaultLanguage = localStorage.getItem('langSelection');
    } else {
        localStorage.setItem('langSelection', defaultLanguage);
    }

    languageSelect.forEach((select) => {
        select.value = defaultLanguage;
    });

    const response = await fetchFunction(`/api/lang/changelanguage/${defaultLanguage}`, 'POST');
    updateElements(response);
    return response;
};

// Add event listener to language selectors to change selected language by user
languageSelect.forEach((select) => {
    select.addEventListener('change', async () => {
        const selectedLanguage = select.value;
        localStorage.setItem('langSelection', selectedLanguage);
        await fetchLanguageData();
    });
});


export default { fetchLanguageData };
