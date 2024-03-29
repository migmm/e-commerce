class Http {

    /* GET */
    async get(url, lang, query, id) {

        if (id && lang) {
            url += `${id}/${lang}`;
        } else if (lang) {
            url += `${lang}?${query}`;
        }

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

            if (!response.ok) {
                const errorCode = response.status;
                const errorMessage = response.statusText;
                throw { status: errorCode, message: errorMessage, responseData: null };
            }

            // Check if the response has content
            if (response.status === 204) {
                return { status: response.status, responseData: null };
            }

            // If not a 204 response, parse as JSON
            const responseData = await response.json();
            return { status: response.status, responseData: responseData };
        } catch (error) {
            console.error('ERROR POST', error);
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
        console.error('Do not call from(), call to delete()!');
    }
}

const http = new Http();
export default http;