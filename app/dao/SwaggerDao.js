const BaseDao = require('./BaseDao');

module.exports = class SwaggerDao extends BaseDao {
    constructor () {
        if (SwaggerDao.singleton) {
            return SwaggerDao.singleton;
        }
        super('swagger');
        SwaggerDao.singleton = this;
    }

    static getInstance () {
        return new SwaggerDao();
    }
};
