
exports.up = async function(knex) {
  return await knex.schema.createTable('users', users => {
    users.increments();

    users   
        .string('firstName', 128)
        .notNullable();

    users   
        .string('lastName', 128)
        .notNullable();

    users   
        .string('email', 128)
        .notNullable()
        .unique();
    
    users
        .string('password', 128)
        .notNullable();

    users
        .string('title', 128);
})



.createTable('recipes', recipes=> {
    recipes.increments();

    recipes
    .text('title')
    .notNullable();

    recipes
    .text('source')
    .notNullable();

    recipes
    .text('ingredients')
    .notNullable();

    recipes
    .text('instructions')
    .notNullable();

    recipes
    .text('category')
    .notNullable();

    recipes
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
    .dropTableIfExists('users')
    .dropTableIfExists('recipes')


};
