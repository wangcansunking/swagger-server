'use strict';

const path = require('path');
const R = require('ramda');
const RedisManager = require('./RedisManager');

module.exports = class Database {
    constructor() {
        if (Database.singleton) {
            return Database.singleton
        } else {
            this.db = RedisManager.getInstance().redis;
            Database.singleton = this;
        }
    }

    *create(tableName, data) {
        let list = JSON.parse(yield this.db.get(tableName)) || [];
        list = R.insert(0, data, list);
        return yield this.db.set(tableName, JSON.stringify(list));
    }

    *remove(tableName, options) {
        let list = JSON.parse( yield this.db.get(tableName));

        function filter(filterData, data) {
            let result = true;
            R.map((k)=>{
                if (filterData[k] instanceof Object && data[k] instanceof Object) {
                    result = filter(filterData[k], data[k]);
                } else if (data[k] != filterData[k]) {
                    result = false;
                }
            }, R.keys(filterData));

            return result;
        }

        list = R.reject(R.curry(filter)(options), list);
        return yield this.db.set(tableName, JSON.stringify(list));
    }

    *update(tableName, data) {
        let list = JSON.parse( yield this.db.get(tableName));
        let index = R.findIndex(R.propEq('id', data.id), list);
        if (index > -1) {
            list = R.update(index)(R.merge(list[index], data))(list);
            return yield this.db.set(tableName, JSON.stringify(list));
        } else {
        //    throw error
            return false;
        }
    }

    *query(tableName, options) {
        let list = JSON.parse( yield this.db.get(tableName));

        function filter(filterData, data) {
            let result = true;
            R.map((k)=>{
                if (filterData[k] instanceof Object && data[k] instanceof Object) {
                    result = filter(filterData[k], data[k]);
                } else if (data[k] != filterData[k]) {
                    result = false;
                }
            }, R.keys(filterData));

            return result;
        }

        if (list) {
            return R.filter(R.curry(filter)(options))(list);
        } else {
            return [];
        }
    }

    static getInstance() {
        return new Database();
    }
}
