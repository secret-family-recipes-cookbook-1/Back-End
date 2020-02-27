exports.seed = function(knex) {

  return knex('ingredients').del()
    .then(function () {
      
      return knex('ingredients').insert([
        {id: 1, recipe_id: 1, name: 'Hamburger meat', amount: '1 pound'},
        {id: 2, recipe_id: 2, name: 'Granny Smith Apples', amount: '5 large'},
        {id: 3, recipe_id: 2, name: 'Pie Crust', amount: 'two'},
        {id: 4, recipe_id: 3, name: 'Chocolate Icing', amount: '32 ounces'},
        {id: 5, recipe_id: 3, name: 'Flour', amount: '4 cups'},
       
      ]);
    });
};