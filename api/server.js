const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();
console.log(process.env.JWT_SECRET);

// const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const apiRouter = require('./api-router');
const usersRouter = require('../users/user-router');
const recipeRouter = require('../recipes/recipe-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api', apiRouter);
server.use('/api/users', usersRouter);
server.use('/api/recipes', recipeRouter);

server.get('/', (req, res) => {
    res.send("Is this thing on???")
});

module.exports = server;