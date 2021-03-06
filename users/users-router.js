const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/secrets.js');
const restricted = require('../middleware/restricted-middleware.js');

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

    if (newUser.username === undefined) {
      res.status(400).json({ errorMessage: "Missing username" });
    } else if (newUser.password === undefined) {
      res.status(400).json({ errorMessage: "Missing password" });
    } else if (newUser.first_name === undefined) {
      res.status(400).json({ errorMessage: "Missing first_name" });
    } else if (newUser.last_name === undefined) {
      res.status(400).json({ errorMessage: "Missing last_name" });
    } else {
      db.add(newUser)
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
        .catch(err => {
          console.log(err.errno);
          if(err.errno === 19){
            res.status(400).json({ errorMessage: 'Username already exists' });
          } else {
            res
              .status(500)
              .json({ errorMessage: "Seems like a server-side issue" }); 
          }
        });
    } 
    
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
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Token" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side issue' });
    })
});

router.get('/:id/stuffs', restricted, (req, res) => {
  const { id } = req.params;

  db.findStuffByUserId(id)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side issue' });
    })
});

router.get('/:id/stuffs/:stuffId', restricted, (req, res) => {
  const { id } = req.params;
  const { stuffId } = req.params;

  db.findStuff(id, stuffId)
    .then(found => {
      res.status(200).json(found);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side issue' });
    })
});

router.post("/:id/stuffs", restricted, (req, res) => {
  const stuff = req.body;
  const { id } = req.params;
  stuff.user_id = id;

  if (stuff.item_name && stuff.price) {
    db.addStuff(stuff)
      .then(added => {
        res.status(201).json({
          message: "item added",
          item_id: added[0]
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Server-side Issue." });
      });
  } else {
    res.status(400).json({ errorMessage: "Required field(name or price) missing." });
  }
});

router.put("/:id/stuffs/:stuffId", validateStuffId(), restricted, (req, res) => {
  const { stuffId } = req.params;
  const newStuff = req.body;

  db.updateStuff(stuffId, newStuff)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Server-side issue." });
    });
});

router.delete("/:id/stuffs/:stuffId", validateStuffId(), restricted, (req, res) => {
  const { stuffId } = req.params;

  db.removeStuff(stuffId)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Server-side issue." });
    });
});

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
};

function validateStuffId() {
  return (req, res, next) => {
    const { id } = req.params;

    db.findStuffByUserId(id)
    .then(found => {
      if (found.length < 1) {
        res
          .status(400)
          .json({
            errorMessage: "ID given does not exist or cannot be found."
          });
      } else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Server-side Issue.' })
    });
  };
};