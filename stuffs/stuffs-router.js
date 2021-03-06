const router = require('express').Router();

const db = require('./stuffs-model.js');

router.get('/', (req, res) => {
    db.find()
      .then(found => {
        res.status(200).json(found);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Serer-side Issue" });
      });
});

router.get('/:id', validateId(), (req,res) => {
    const {id} = req.params;

    db.find(id)
      .then(found => {
        res.status(200).json(found);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Serer-side Issue" });
      });
});


module.exports = router;

function validateId() {
  return (req, res, next) => {
    const { id } = req.params;

    db.find(id)
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