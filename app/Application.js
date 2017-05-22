'use strict';

const fs = require('fs');

const app = require('koa')();

const staticServer = require('koa-static');

const logger = require('koa-logger')();

const body = require('koa-body')();

// const router = require('koa-router')({prefix:'/api'});
const router = require('koa-router')();

const Response = require('./model/Response');
const Constants = require('./model/Constants');

const REST_FOLDER = '/rest/';

module.exports = app;

let files = fs.readdirSync(`${__dirname}${REST_FOLDER}`);

files.forEach(file => {
    router.use(require(`${__dirname}${REST_FOLDER}${file}`).routes());
});

app.use(logger);

app.use(staticServer(`${__dirname}/../public`));
app.use(staticServer(`${__dirname}/../build`));

app.use(body);

app.use(router.routes()).use(router.allowedMethods());

app.use(function * () {
    this.status = 404;

    this.body = Response.generateResponse(Constants.notFound);
});

app.listen(3000);

console.log('start on port 3000');
