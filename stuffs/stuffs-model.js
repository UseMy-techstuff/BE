const db = require('../database/db-config.js');

module.exports = {
    find
};

function find(id) {
    if(id) {
        return db("stuffs").where({ id: id });
    } else {
        return db("stuffs");
    }
};