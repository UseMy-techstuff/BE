const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/secrets.js');

const db = require('./users-model');

//routes
router.get('/', (req, res) => {
    res.json({ Hello: 'User' })
});

router.post('/register', (req, res) => {
    // hashing
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hash;

    db
      .add(newUser)
      .then(user => {
          req.session.loggedin = true;
          res.status(201).json({
            message: "profile created!",
            user: {
              id: user.id,
              username: user.username
            }
          });
      })
      .catch(err => res.status(500).json({ errorMessage: 'Seems like a server-side issue' }))
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.username = user.username;
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side issue' });
    })
});

router.get('/:id/stuffs', (req, res) => {
  const { id } = req.params;

  db.findStuffByUserId(id)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side issue' });
    })
})

module.exports = router;

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user"
  };

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, jwtSecret, options);
}