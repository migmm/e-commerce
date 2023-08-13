class Find {
    static find(toSearch, products) {
        toSearch = toSearch.toLowerCase();

        return products.filter(product => {
            for (let key in product) {
                if (key === "id" || key === "productName" || key === "urlName") {
                    if (product[key].toLowerCase() === toSearch) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
}

export default Find;
