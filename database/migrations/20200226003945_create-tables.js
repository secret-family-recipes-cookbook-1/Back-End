
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments();

    table   
        .string('firstName', 128)
        .notNullable();

    table   
        .string('lastName', 128)
        .notNullable();

    table   
        .string('email', 128)
        .notNullable()
        .unique();
    
    table
        .string('password', 128)
        .notNullable();

    table
        .string('title', 128);
});



await knex.schema.createTable('recipes', table=> {
    table.increments();

    table
    .text('title')
    .notNullable();

    table
    .text('source')
    .notNullable();

    table
    .text('ingredients')
    .notNullable();

    table
    .text('instructions')
    .notNullable();

    table
    .text('category')
    .notNullable();

    table
    .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

};


exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')

};
