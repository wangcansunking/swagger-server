'use strict';
const Router = require('koa-router');
const Response = require('../model/Response');
const Constants = require('../model/Constants');
const PATH = '/swaggers';

const swaggerService = require('../service/swaggerService')();

let swaggerRouter = new Router();

module.exports = swaggerRouter;

swaggerRouter
    .get(PATH, function * () {
        this.body = yield swaggerService.getList(this.request.body);
    })
    .post(PATH, function * () {
        if (yield swaggerService.addOrUpdate(this.request.body, this.request.query.stable === 'true')) {
            this.body = Response.generateSuccessResponse();
        }
    })
    .delete(PATH + '/:title/:version', function * () {
        if (yield swaggerService.removeList({info: {title: this.params.title, version: this.params.version}})) {
            this.body = Response.generateSuccessResponse();
        }
    })
    .get(PATH + '/:title/:version', function * () {
        this.body = yield swaggerService.getOne({info: {title: this.params.title, version: this.params.version}});
    })
    .get(PATH + '/infos', function * () {
        this.body = yield swaggerService.getVersions();
    });
