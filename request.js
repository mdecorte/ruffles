function getData(params, cb) {
    return new Promise((resolve, reject) => {
        cb(params, (err, data) => {
            if (data) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

module.exports = {
    getData: (params, cb) => getData(params, cb)
};
