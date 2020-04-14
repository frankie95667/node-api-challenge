const {Loggly} = require('winston-loggly-bulk');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new Loggly({
            token: '72f2b5a0-8056-4982-8259-95fc6a79cc41',
            subdomain: 'anthonyk2020',
            tags: ["Winston-NodeJS"],
            json: true
        }),
        new winston.transports.Console({ level: 'info' })
    ]
})

logger.stream = {
    write: (info) => {
        logger.info(info);
    }
}

module.exports = logger;