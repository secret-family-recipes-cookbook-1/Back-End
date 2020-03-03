exports.seed = function(knex) {

  return knex('recipes').del()
    .then(function () {
      
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: 'Spaghetti', source: 'grandma', ingredients: 'noodles and sauce', instructions: 'cook and eat', category: 'dinner'},
        {id: 2, user_id: 1, title: 'Apple Pie', source: 'grandma', ingredients: 'apples and sugar', instructions: 'bake and eat', category: 'dessert'},
        {id: 3, user_id: 1, title: 'Chocolate Cake', source: 'grandma', ingredients: 'chocolate and cake', instructions: 'bake and eat', category: 'breakfast'}
      ]);
    });
};
