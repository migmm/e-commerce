const updateElements = (elementData, parentKey = "") => {
    Object.entries(elementData).forEach(([key, value]) => {
        const elementKey = parentKey ? `${parentKey}-${key}` : key;

        if (typeof value === 'object') {
            updateElements(value, elementKey);
        } else {
            const elements = document.querySelectorAll(`[data-lang="${elementKey}"]`);
            elements.forEach((element) => {
                element.innerHTML = value;
            });

            const placeholders = document.querySelectorAll(`[data-placeholder="${elementKey}"]`);
            placeholders.forEach((placeholder) => {
                placeholder.placeholder = value;
            });

            const titles = document.querySelectorAll(`[data-title="${elementKey}"]`);
            titles.forEach((title) => {
                title.title = value;
            });

            const alts = document.querySelectorAll(`[data-alt="${elementKey}"]`);
            alts.forEach((alt) => {
                alt.alt = value;
            });
        }
    });
};

const fetchFunction = async (route, method) => {
    try {
        const response = await fetch(route, {
            method: method
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data.', error);
        throw error;
    }
};

const fetchLanguageData = async () => {

    const availableLangs = await fetchFunction('/api/lang/availablelangs', 'GET')

    const supportedLanguages = availableLangs.availableLangs

    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageParts = browserLanguage.split("-");
    const language = languageParts[0];

    let defaultLanguage = supportedLanguages.includes(language) ? language : 'en';

    if (localStorage.getItem('langSelection')) {
        console.log(localStorage.getItem('langSelection'))
        defaultLanguage = localStorage.getItem('langSelection');
    } else {
        localStorage.setItem('langSelection', defaultLanguage);
    }

    languageSelect.value = defaultLanguage;

    const response = await fetchFunction(`/api/lang/changelanguage/${defaultLanguage}`, 'POST')

    return response;
};

const languageSelect = document.getElementsByClassName('language-select')[0];

languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('langSelection', selectedLanguage);
    fetchLanguageData();
    location.reload();
});

export default {
    fetchLanguageData
}