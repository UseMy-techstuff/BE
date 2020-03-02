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

router.get('/:id', (req,res) => {
    const {id} = req.params;

    db.find(id)
      .then(found => {
        if (found.length < 1) {
          res
            .status(400)
            .json({ errorMessage: "ID given does not exist or cannot be found." });
        } else {
          res.status(200).json(found);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Serer-side Issue" });
      });
});

router.post('/', (req, res) => {
    const stuff = req.body;

    if(stuff.item && stuff.price) {
        db.add(stuff)
          .then(added => {
            res.status(200).json(added);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Server-side Issue." });
          });
    } else {
        res.status(400).json({ errorMessage: 'More data required.' })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newStuff = req.body;

    db.update(id, newStuff)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Server-side issue.' });
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Server-side issue.' });
        });
});


module.exports = router;