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
    async post(url, dato) {
       
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
    async put(url, id, dato) {
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