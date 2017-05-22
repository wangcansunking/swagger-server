'use strict';

const BaseEntity = require('./BaseEntity');

module.exports = class Swagger extends BaseEntity {
    constructor (swagger) {
        super();
        Object.assign(this, swagger);
    }
};
