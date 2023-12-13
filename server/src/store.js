const { RedisPersistence } = require('y-redis');

const Y = require('yjs');

const config = {
  redisOpts: {
    url: 'redis://localhost:6379',
  },
};
module.exports.persistence = new RedisPersistence(config);

module.exports.persistence.writeState = async (name, doc) => {};
