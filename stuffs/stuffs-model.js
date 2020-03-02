const db = require('../database/db-config.js');

module.exports = {
    find,
    add,
    update,
    remove
};

function find(id) {
    if(id) {
        return db("stuffs").where("id", id);
    } else {
        return db("stuffs").select("id", "item", "price");
    }
};

function add(item) {
  return db("stuffs")
    .insert(item, "id")
    .then(([id]) => find(id));
};

function update(id, item) {
    return db("stuffs").where({ id: id }).update(item);
};

function remove(id) {
    return db("stuffs").where({ id: id}).del();
};