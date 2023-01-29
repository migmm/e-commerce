class Find {

    static find (toSearch, products) {
        
        let results;

        for (var i = 0; i < products.length; ++i) {
            for (let urlName in products[i]) {
                if (products[i][urlName].toString().toLowerCase().indexOf(toSearch.toLowerCase()) != -1) {
                    results = products[i]
                }
            }
        }

        return results;
    }
}

export default Find;