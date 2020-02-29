
exports.up = function(knex) {
  return knex.schema.createTable('stuffs', stuff => {
      stuff.increments();

      stuff
        .string('item', 128)
        .notNullable();

      stuff
        .integer('price', 128)
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stuffs')
};
