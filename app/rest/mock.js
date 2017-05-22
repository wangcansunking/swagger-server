'use strict';
const Router = require('koa-router');
const PATH = '/mock/*';

let mockRouter = new Router();

module.exports = mockRouter;

mockRouter
    .use(PATH, function * () {
        this.body = 'haa';
    });
