'use strict';
const Router = require('koa-router');
const PATH = '/services/**';

let apiRouter = new Router();

module.exports = apiRouter;

apiRouter
    .all(PATH, require('../middleware/proxy'));
