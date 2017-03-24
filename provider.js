const request = require('./request.js');
const config = require('./config.js');
const ns = require('ns-api')({
    username: config.ns.username,
    password: config.ns.password
});

function ennes(params, cb) {

    const nsQuery = ns[cb];
    const props = {
        'vertrektijden': params.station,
        'storingen': {
            station: params.station,
            unplanned: params.unplanned || true
        }
    }

    return request.getData(props[cb], ns[cb])

}

module.exports = {
    ennes: (params, cb) => ennes(params, cb)
};
