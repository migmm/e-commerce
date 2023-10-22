const currencySet = async () => {
    const currencySelects = document.querySelectorAll('.currency-select');

    for (const currencySelect of currencySelects) {
        if (localStorage.getItem('currency')) {
            const currentCurrency = localStorage.getItem('currency');

            for (let i = 0; i < currencySelect.options.length; i++) {
                if (currencySelect.options[i].value === currentCurrency) {
                    currencySelect.options[i].selected = true;
                    break;
                }
            }
        }

        currencySelect.addEventListener('change', () => {
            const selectedCurrency = currencySelect.value;
            localStorage.setItem('currency', selectedCurrency);
            location.reload();
        });
    }
};

export default {
    currencySet
};
