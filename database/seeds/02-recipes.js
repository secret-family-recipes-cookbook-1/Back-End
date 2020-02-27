exports.seed = function(knex) {

  return knex('recipes').del()
    .then(function () {
      
      return knex('recipes').insert([
        {id: 1, user_id: 1, title: 'Spaghetti', source: 'grandma'},
        {id: 2, user_id: 1, title: 'Apple Pie', source: 'grandma'},
        {id: 3, user_id: 1, title: 'Cocolate Cake', source: 'grandma'}
      ]);
    });
};
