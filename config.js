const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'ian-bot',
    level: 'debug'
});

module.exports = {
    logger
};
