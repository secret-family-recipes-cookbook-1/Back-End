exports.seed = function(knex) {

  return knex('instructions').del()
    .then(function () {
      
      return knex('instructions').insert([
        {id: 1, recipe_id: 1, notes:'Boil noodles. Brown meat. Add sauce.'},
        {id: 2, recipe_id: 2, notes:'Slide apples. Carmalize in brown sugar. Add to piepan. Bake.'},
        {id: 3, recipe_id: 3, notes:'Mix dry ingredients with wet. Bake at 350. Add icing.'},
      ]);
    });
};