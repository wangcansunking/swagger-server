const authenticationUtil = require('../utils/AuthenticationUtil');

const proxy = require('koa-proxy');

const config = require('../config');

module.exports = proxyMiddleware;

function * proxyMiddleware (next) {
    this.header.Authorization = authenticationUtil.getAuthentication();
    console.log(this.header.Authorization)
    console.log(config.gatewayUrl)
    yield proxy({
        host: config.gatewayUrl,
        map: function (path) {
            return path.replace(/^\/services/, '');
        }
    });
}
