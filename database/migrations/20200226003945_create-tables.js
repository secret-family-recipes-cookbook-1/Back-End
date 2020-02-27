
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments();

    table 
        .string('username', 128)
        .notNullable()
        .unique();

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

await knex.schema.createTable('recipes', table => {
    table.increments();

    table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    table
        .string('title')
        .notNullable()

    table   
        .string('source')

    table
        .text('body');

});

await knex.schema.createTable('ingredients', table => {
    table.increments();

    table
        .integer('recipe_id')
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    table
        .string('name')
        .notNullable();

    table
        .text('amount')
        .notNullable();

});

await knex.schema.createTable('instructions', table => {
    table.increments()

    table
        .integer('recipe_id')
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')       

    table
        .text('notes')
        .notNullable();
});

await knex.schema.createTable('category', table => {
    table.increments()

    table
        .integer('recipe_id')
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        
    table
        .string('category')
        .notNullable();

});

}

exports.down = function(knex) {
  return knex.schema 
    .dropTableIfExists('category')
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')

};
