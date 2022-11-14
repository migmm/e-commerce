class Http {

    /* GET */
    async get(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR GET', error);
        }
    }

/* POST */
//Normal post to work with every request
    async postc(url, dato) {
    try {
        return await fetch(url, {
            method: 'post',
            body: JSON.stringify(dato),
            headers: { 'content-type': 'application/json' }
        }).then(r => r.json());
    } catch (error) {
        console.error('ERROR POST', error);
    }
}

    //adapted to work with FormData
    async post(url) {

        //Bypass to get the files too
        let data = new FormData(document.getElementById("form-add-products"))
        console.log(data)
        const colorsString = data.get('colors');
        data.delete('colors');
        var colorsSplit = colorsString.split(',');
        colorsSplit.forEach((item) => data.append("colors[]", item))
        
        try {
            return await fetch(url, {
                method: 'post',
                body: data,
            }).then(r => r.json());
        } catch (error) {
            console.error('ERROR POST', error);
        }
    }

    /* PUT */
    //As POST, this is adapted to work with
    // TODO: put all in a controller 
    async put(url, id, dato) {
    
        console.log("datazoooooooooooooooooooooooooo", dato);
        let colorsString = dato.colors;
        let colorsSplit = colorsString.split(',');
        dato["colors"] = colorsSplit;
        console.log(dato)

        try {
            return await fetch(url + id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }
            }).then(r => r.json());
        } catch (error) {
            console.error('ERROR PUT', error);
        }
    }

    //For normal use
    async putc(url, id, dato) {

        try {
            return await fetch(url + id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }
            }).then(r => r.json());
        } catch (error) {
            console.error('ERROR PUT', error);
        }
    }


    /* DELETE */
    async delete(url, id) {
        try {
            return await fetch(url + id, { method: 'delete' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR DELETE', error);
        }
    }   
    async del() {
        console.error('No llamar a del(), sino a delete()!');
    }   
}

const http = new Http();

export default http;