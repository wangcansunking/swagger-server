'use strict';

const Constants = require('./Constants');

module.exports = class Response {
    constructor ({status, code, message, data}) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    toString () {
        return `status: ${this.status},code: ${this.code},message: ${this.message},data: ${JSON.stringify(this.data)}`;
    }

    static generateSuccessResponse (data) {
        let result = new Response(Constants.success);
        result.data = data;
        return result;
    }

    static generateResponse (constants) {
        return new Response(constants);
    }
};
