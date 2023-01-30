class Find {

    static find (toSearch, products) {
        
        var results = [];

        for (var i = 0; i < products.length; ++i) {
            for (let key in products[i]) {
                if (products[i][key].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                    results.push(products[i]);
                }
            }
        }

        let result = results.filter(
            (person, index) => index === results.findIndex(
                other => person.id === other.id
                    && person.productName === other.productName
            )
        );

        return result;
    }
}

export default Find;