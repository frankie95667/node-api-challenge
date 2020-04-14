require('dotenv').config();
const server = require('./api/server');
const morgan = require('morgan');
const logger = require('./logger');

server.use(morgan("combined", { stream: logger.stream }))
const PORT = process.env.PORT || 5000;

server.get('/', (req, res, next) => {
    res.status(200).json(req.originalUrl);
})

server.listen(PORT, () => {
    logger.info(`Listening on port: ${PORT}`)
})