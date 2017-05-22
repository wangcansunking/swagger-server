const Redis = require('ioredis');

/**
 * delegate redis client
 * @type {RedisManager}
 */
module.exports = class RedisManager {
    constructor() {
        if (RedisManager.singleton) {
            return RedisManager.singleton;
        } else {
            this.redis = new Redis();
            RedisManager.singleton = this;
        }
    }

    static getInstance() {
        return new RedisManager();
    }
}
