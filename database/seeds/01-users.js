exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, firstName: 'Katrina', lastName: 'Dierking', email: 'kl@gmail.com', password: 'cook'},
        {id: 2, firstName: 'Taran', lastName: 'Neeld', email: 'tn@gmail.com',password: 'cook'},
        {id: 3, firstName: 'JT', lastName: 'Tromly', email: 'jt@gmail.com', password: 'cook'},
        {id: 4, firstName: 'Gina', lastName: 'Christians', email: 'gc@gmail.com', password: 'cook'},
        {id: 5, firstName: 'CoffeeMilk',lastName: 'None', email: 'cm@gmail.com',password: 'cook'}
       ]);
    });
};

