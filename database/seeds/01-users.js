exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'Katrina', email: 'kl@gmail.com', password: 'cook'},
        {id: 2, username: 'Taran', email: 'tn@gmail.com',password: 'cook'},
        {id: 3, username: 'JT', email: 'jt@gmail.com', password: 'cook'},
        {id: 4, username: 'Gina', email: 'gc@gmail.com', password: 'cook'},
        {id: 5, username: 'CoffeeMilk', email: 'cm@gmail.com',password: 'cook'}
       ]);
    });
};

