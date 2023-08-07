class render {
    static async renderTemplateCards(products, hbstemplate, query, mode = 1) {

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
