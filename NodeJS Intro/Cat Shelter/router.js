const url = require('url');

let routes = {
    
}

function match(requrl,method) {
    let myUrl = url.parse(requrl);

    let handler = routes[method][myUrl.pathname];

    return handler;
}

function register(url, handler , method = 'GET') {
    if(!routes[method]) {
        routes[method] = {};
    }

    if(url && handler) {
        routes[method][url] = handler;
    }
}

module.exports = {
    routes,
    match,
    register
}