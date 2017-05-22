'use strict';

const SwaggerDao = require('../dao/SwaggerDao');
const Swagger = require('../entity/Swagger');

module.exports = swaggerService;

function swaggerService () {
    let swaggerDao = SwaggerDao.getInstance();

    let addSwagger = function* (data) {
        let swagger = new Swagger(data);

        return yield swaggerDao.create(swagger);
    };

    let updateSwagger = function* (data) {
        let swagger = new Swagger(data);

        return yield swaggerDao.update(swagger);
    };

    let addOrUpdate = function* (data, stable) {
        data.stable = stable;

        let queryList = yield swaggerDao.query({info: {title: data.info.title, version: data.info.version}});

        if (queryList.length === 0) {
            return yield addSwagger(data);
        } else {
            if (queryList.length === 1) {
                data.id = queryList[0].id;
                return yield updateSwagger(data);
            } else {
                return false;
            }
        }
    };

    let getList = function* (options) {
        return yield swaggerDao.query(options);
    };

    let removeList = function* (options) {
        return yield swaggerDao.remove(options);
    };

    let getOne = function* (options) {
        let list = yield swaggerDao.query(options);
        let result = list[0];

        delete result.id;
        delete result.createTimeString;
        delete result.createTime;
        delete result.stable;
        return result;
    };

    let getVersions = function* (options) {
        let queryList = yield swaggerDao.query(options);

        let infoList = queryList.map(swagger => {
            return {title: swagger.info.title, version: swagger.info.version, stable: swagger.stable};
        });

        let result = {};

        infoList.forEach(function (info) {
            if (!result[info.title]) {
                result[info.title] = {stable: [], temp: []};
            }
            if (info.stable) {
                result[info.title].stable.push(info.version);
            } else {
                result[info.title].temp.push(info.version);
            }
        });

        return result;
    };

    return {
        addOrUpdate,
        getList,
        removeList,
        getOne,
        getVersions
    };
}
