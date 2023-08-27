async function getIdFromHash(route) {

    // Remove #
    let hashFromURL = location.hash.slice(1);

    // Check if / exist at beginning, if exist remove
    if (hashFromURL[0] === '/') {
        hashFromURL = hashFromURL.slice(1);
    }

    hashFromURL = hashFromURL.split('/');

    if (route === 1) {
        hashFromURL = '#/' + hashFromURL[0];
        hashFromURL = hashFromURL.toLowerCase();
        window.location.hash = hashFromURL;
        return;
    }

    hashFromURL = hashFromURL[1];
    return hashFromURL;
}

export default getIdFromHash;