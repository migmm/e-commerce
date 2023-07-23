const updateElements = (elementData) => {
    Object.entries(elementData).forEach(([elementKey, text]) => {
        const elements = document.querySelectorAll(`[data-lang="${elementKey}"]`);
        elements.forEach((element) => {
            element.textContent = text;
        });
    });
};

const fetchLanguageData = () => {
    const supportedLanguages = ['en', 'es'];
    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageParts = browserLanguage.split("-");
    const language = languageParts[0];
    let defaultLanguage = supportedLanguages.includes(language) ? language : 'en';

    if (localStorage.getItem('langSelection')) {
        console.log(localStorage.getItem('langSelection'))
        defaultLanguage = localStorage.getItem('langSelection');
    }

    languageSelect.value = defaultLanguage;
    
    fetch(`/api/lang/${defaultLanguage}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(languageData => {
            updateElements(languageData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const languageSelect = document.getElementsByClassName('language-select')[0];

languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('langSelection', selectedLanguage);
    fetchLanguageData(selectedLanguage);
});

export default {
    fetchLanguageData
}