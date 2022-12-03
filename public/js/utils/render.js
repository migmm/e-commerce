class render  {

    static async renderTemplateCards(products, hbstemplate, query) {
        const hbsFile = await fetch(hbstemplate).then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector(query).innerHTML = html;
    }
}
    /*    
        static async init () {
        console.log('PageNosotros .init()');
        PageNosotros.goToTopOnLoad();
    } */


export default render;
