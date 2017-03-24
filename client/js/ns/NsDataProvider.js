function NsDataProvider(url) {

    return fetch(url, {
            method: 'get'
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
};

module.exports = {
    NsDataProvider
};
