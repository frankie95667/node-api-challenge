require('dotenv').config();
const express = require('express');
const server = require('./api/server');
const morgan = require('morgan');
const logger = require('./logger');

server.use(morgan("combined", { stream: logger.stream }))
server.use(express.json());
const PORT = process.env.PORT || 5000;

server.get('/', (req, res, next) => {
    res.status(200).json(req.originalUrl);
})

server.listen(PORT, () => {
    logger.info(`Listening on port: ${PORT}`)
})