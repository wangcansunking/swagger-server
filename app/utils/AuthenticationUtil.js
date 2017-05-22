'use strict';

const request = require('sync-request');
const config = require('../config');

let authenticationUtil = (function () {
    let clientId = config.client.id;
    let clientSecret = config.client.secret;
    let clientCredential = Buffer(`${clientId}:${clientSecret}`, 'binary').toString('base64');

    let accessToken = '';
    let refreshToken = '';
    let refreshTime;

    function refreshAccessToken() {
        const options = {
            method: 'POST',
            uri: `${config.gatewayUrl}/login/oauth/token`,
            qs: {
                grant_type: 'client_credentials'
            },
            headers: {
                Authorization: `Basic ${clientCredential}`
            },
            json: true
        };

        let response = null;

        response = request(options.method, options.uri, options);

        if (response.statusCode >= 300) {
            let err = new Error('Server responded with status code ' + response.statusCode + ':\n' + response.body.toString('utf8'));
            err.statusCode = response.statusCode;
            err.headers = response.headers;
            err.body = response.body;
            throw err;
        }
        else {
            let body = JSON.parse(response.getBody('utf8'));
            accessToken = body.access_token;
            refreshToken = body.refresh_token;
            refreshTime = (new Date()).getTime();
        }
    }

    function getAuthentication(force) {
        if (force) {
            refreshAccessToken();
        }

        if (!refreshTime) {
            refreshAccessToken();
        }

        let tempTime = (new Date()).getTime();

        if ((tempTime - refreshTime) > (3500 * 1000)) {
            refreshAccessToken();
        }

        return `Bearer ${accessToken}`;
    }

    return {
        getAuthentication: getAuthentication
    };
})();

module.exports = authenticationUtil;
