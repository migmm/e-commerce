class render {
    static async renderTemplateCards(products, hbstemplate, query, currentLang, mode = 1) {

        if(products) {
        products.forEach(product => {
            product.productName = product.productName && product.productName[currentLang]
                ? product.productName[currentLang]
                : '';
            product.shortDescription = product.shortDescription && product.shortDescription[currentLang]
                ? product.shortDescription[currentLang]
                : '';
            product.longDescription = product.longDescription && product.longDescription[currentLang]
                ? product.longDescription[currentLang]
                : '';
        });
    }
        const hbsFile = await fetch(hbstemplate).then(r => r.text());
        const template = Handlebars.compile(hbsFile);

        const html = template({ products });

        if (mode === 1) {
            document.querySelector(query).innerHTML = html;
        } else {
            query.innerHTML = html;
        }
    }
}

export default render;
