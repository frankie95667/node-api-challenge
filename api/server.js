const express = require('express');
const server = express();
const actionRouter = require('./Actions/router');
const projectRouter = require('./Projects/router');

server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;