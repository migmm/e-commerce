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

    // Function adapted to work with FormData
    // If you send JSON add uncommented lines
    async post(url, data) {
        try {
            return await fetch(url, {
                method: 'post',
                body: data, // JSON.stringify(data),
                // headers: { 'content-type': 'application/json' }
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