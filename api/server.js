// express imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

// server and local imports
const server = express();
const userRouter = require('../users/users-router.js');
const knex = require('../database/db-config.js');
const authenticate = require('../middleware/authenticate-middlware.js');
const authorize = require('../middleware/restricted-middleware.js');
const stuffsRouter = require('../stuffs/stuffs-router');

// session
const sessionConfig = {
  name: "Corell's Cookie",
  secret: "Use My Stuff",
  resave: false,
  saveUninitialized: true, // related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // should be true in production
    httpOnly: true // true means JS can't touch the cookie
  },
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 10
  })
};

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger());
server.use(session(sessionConfig));

// use routers
server.use('/api/users', userRouter);
server.use('/api/stuffs', authorize, stuffsRouter);

//routes
server.get('/', (req, res) => {
    res.json({ Hello: 'World'})
});

module.exports = server;

function logger() {
    return (req, res, next) => {
        console.log(`${req.method} request to ${req.originalUrl}`);
        next();
    };
};

function checkRole(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.role &&
      req.decodedToken.role.toLowerCase() === role
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass!" });
    }
  };
};