console.log('Start!');

var isStable = process.argv.indexOf('-stable') > -1;

if (isStable) {
    console.log('Attention: You are using the Stable Version!');
}

var swagger = require('./swagger/generated/swagger.json');

var http = require('http');

var request = new http.ClientRequest({
    hostname: '172.16.30.90',
    port: '3001',
    path: '/swaggers?stable=' + isStable,
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    }
});

request.end(JSON.stringify(swagger), function () {
    console.log('Upload Api Doc Success!');
});

