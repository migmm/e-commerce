const languageSelect = document.querySelectorAll('.language-select');

const updateElements = (elementData, parentKey = "") => {
    const elementsToUpdate = [];

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

    traverseData(elementData);

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

const fetchFunction = async (route, method) => {
    try {
        const response = await fetch(route, { method });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data.', error);
        throw error;
    }
};

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

languageSelect.forEach((select) => {
    select.addEventListener('change', async () => {
        const selectedLanguage = select.value;
        localStorage.setItem('langSelection', selectedLanguage);
        await fetchLanguageData();
    });
});

export default { fetchLanguageData };
