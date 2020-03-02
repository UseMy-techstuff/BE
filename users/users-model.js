const db = require('../database/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findStuffByUserId
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
}