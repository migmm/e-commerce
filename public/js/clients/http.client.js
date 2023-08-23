class Http {

    /* GET */
    async get(url, lang, query, id) {

        if (id && lang) {
            url += `${id}/${lang}`;
        } else if (lang) {
            url += `${lang}?${query}`;
        }
        console.log("url", url)
        console.log("lang", lang)
        console.log("query", query)
        try {
            return await fetch(url, { method: 'get' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR GET', error);
        }
    }

    /* POST */
    async post(url, data, mode) {
        try {
            const headers = mode === 'json' ? { 'content-type': 'application/json' } : undefined;
            const body = mode === 'json' ? JSON.stringify(data) : data;
    
            const response = await fetch(url, {
                method: 'post',
                body: body,
                headers: headers,
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                const errorCode = response.status;
                const errorMessage = responseData.message || response.statusText;
                throw { status: errorCode, message: errorMessage, responseData: null };
            }
    
            return { status: response.status, responseData: responseData };
        } catch (error) {
            /*  console.error('ERROR POST', error); */
            throw error;
        }
    }
    

    /* PUT */
    async put(url, id, data, mode) {
        try {
            if (mode === 'json') {
                return await fetch(url + id, {
                    method: 'put',
                    body: JSON.stringify(dato),
                    headers: { 'content-type': 'application/json' }
                }).then(r => r.json());
            }

            if (mode === 'formdata') {
                return await fetch(url + id, {
                    method: 'put',
                    body: data,
                }).then(r => r.json());
            }
        } catch (error) {
            console.error('ERROR POST', error);
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