
exports.up = function(knex) {
  return knex.schema.createTable('stuffs', stuff => {
      stuff.increments();

      stuff
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      stuff
        .string('item_name', 128)
        .notNullable();

      stuff.string('description')

      stuff
        .integer('price', 128)
        .notNullable();
      
      stuff
        .boolean('rented')
        .defaultTo(false);

      stuff
        .string('img_url');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stuffs')
};
