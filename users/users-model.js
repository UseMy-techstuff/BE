const db = require('../database/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findStuff,
  findStuffByUserId,
  addStuff,
  updateStuff,
  removeStuff
};

function find() {
  return db("users").select("id", "username");
};

function findBy(filter) {
  return db("users").where(filter);
};

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
};

function findStuffByUserId(id) {
  return db("stuffs")
    .where({user_id: id});
};

function findStuff(userId, stuffId) {
  return db("stuffs").where({
    user_id: userId,
    id: stuffId
  });
};

function addStuff(item) {
  return db("stuffs").insert(item);
};

function updateStuff(id, item) {
    return db("stuffs").where({ id: id }).update(item);
};

function removeStuff(id) {
    return db("stuffs").where({ id: id }).del();
};