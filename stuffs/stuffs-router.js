const router = require('express').Router();

const db = require('./stuffs-model.js');

router.get('/', (req, res) => {
    db.find().then(found => {
        res.status(200).json(found);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Serer-side Issue" });
    })
});

module.exports = router;