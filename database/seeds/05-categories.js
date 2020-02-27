exports.seed = function(knex) {

  return knex('category').del()
    .then(function () {
      
      return knex('category').insert([
        {id: 1, recipe_id: 1, category:'Dinner'},
        {id: 2, recipe_id: 2, category:'Breakfast'},
        {id: 3, recipe_id: 3, category:'Dessert'} 
      ]);
    });
};