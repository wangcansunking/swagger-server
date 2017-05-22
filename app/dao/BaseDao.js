'use strict';

let databaseService = require('../utils/Database').getInstance();

module.exports = class BaseDao {
    constructor(tableName) {
        this.tableName = tableName;
    }

    *create(data) {
        return yield databaseService.create(this.tableName, data);
    }

    *update(data) {
        return yield databaseService.update(this.tableName, data);
    }

    *remove(options) {
        return yield databaseService.remove(this.tableName, options);
    }

    *query(options) {
        return yield databaseService.query(this.tableName, options);
    }
}
