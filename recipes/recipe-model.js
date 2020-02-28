const db = require('../../database/dbConfig');

async function find(userId) {
    return db('recipes')
    .WHERE ({ 'recipes.user_id':userId })
}

async function findById(recipeId, userId) {
    const recipe = await db('recipes')
    .WHERE({'recipes.id':recipeId, 'recipes.user_id':userId})
    .FIRST();
  
    if(recipe) {
      const ingredients = await db('ingredients')

      .JOIN('recipes', 'recipes.id', 'ingredients.recipe_id')
      .SELECT('ingredients.name')
      .WHERE({'ingredients.recipe_id':recipeId })
      .map(ingredient => {
        return ingredient.name;
      });
  
      const instructions = await db('instructions')
        .JOIN('recipes', 'recipes.id', 'instructions.recipe_id')
        .SELECT('instructions.name')
        .WHERE({'instructions.recipe_id':recipeId })
        .map(instruction => {
          return instruction.name;
        });
  
      const category = await db('category')
        .JOIN('recipes', 'recipes.id', 'category.recipe_id')
        .SELECT('category.category')
        .WHERE({'category.recipe_id':recipeId})
        .map(category => {
          return category.category;
        });
  
      const result = { ...recipe, ingredients, instructions, category }
      return result;
    } else {
      return 'No recipe found.'
    }
  };
  
  async function add(recipe, userId) {
  
    const ingredients = recipe.ingredients;
    const instructions = recipe.instructions;
    const category = recipe.category;
  
    const recipeAdd = 
        {   user_id: userId, 
            title: recipe.title, 
            source: recipe.source, 
            notes: recipe.notes }
    
    const newRecipe = await db('recipes')
    .INSERT(recipeAdd);
    
  
    ingredients
    .forEach(async ingredient => {
      ingredientAdd = {name:ingredient, recipe_id:newRecipe[0] }
      await db('ingredients')
      .INSERT(ingredienAdd)
    });
  
    instructions
    .forEach(async instruction => {
      instructionAdd = { name:instruction, recipe_id:newRecipe[0]}
      await db('instructions')
      .INSERT(instructionAdd)
    });
  
    category
    .forEach(async category => {
        categoryAdd = {category:category, recipe_id:newRecipe[0] }
        await db('category')
        .INSERT(categoryAdd)
    });
  
    return find(userId);
  }
  
  async function remove(recipeId, userId) {
    await db('category')
      .JOIN('recipes', 'recipes.id', 'category.recipe_id')
      .WHERE({'category.recipe_id': recipeId})
      .del();
  
    await db('instructions')
      .JOIN('recipes', 'recipes.id', 'instructions.recipe_id')
      .WHERE({'instructions.recipe_id': recipeId})
      .del();
  
    await db('ingredients')
      .JOIN('recipes', 'recipes.id', 'ingredients.recipe_id')
      .WHERE({'ingredients.recipe_id': recipeId})
      .del();
    
    await db('recipes')
      .WHERE({'recipes.id': recipeId})
      .del();
    
    return find(userId);
  }
  
  async function update(recipeId, userId, changes) {
    const recipe = await db('recipes')
      .WHERE({'recipes.id': recipeId, 'recipes.user_id': userId})
      .FIRST();
    
    const firstIng = await db('ingredients')
      .JOIN('recipes', 'recipes.id', 'ingredients.recipe_id')
      .SELECT('ingredients.*')
      .WHERE({'ingredients.recipe_id': recipeId })
      .map(ingredient => {
        return ingredient.name;
      });
  
    const firstInst = await db('instructions')
      .JOIN('recipes', 'recipes.id', 'instructions.recipe_id')
      .SELECT('instructions.*')
      .WHERE({'instructions.recipe_id': recipeId })
      .map(instructions => {
        return instructions.name;
    });
  
    const firstCat = await db('category')
      .JOIN('recipes', 'recipes.id', 'category.recipe_id')
      .SELECT('category.*')
      .WHERE({'category.recipe_id': recipeId })
      .map(category => {
        return category.name;
    });
  
    
    const recipeUpdate = 
        { ...recipe, 
            title: changes.title, 
            source: changes.source, 
            notes: changes.notes 
        }
    
    if(recipe) {
      await db('recipes')
        .WHERE({'recipes.id':recipeId})
        .FIRST()
        .UPDATE(recipeUpdate);
  
      if(firstIng !== changes.ingredients) {
      
        await db('ingredients')
        .JOIN('recipes', 'recipes.id', 'ingredients.recipe_id')
        .SELECT('ingredients.*')
        .WHERE({'ingredients.recipe_id': recipeId })
        .del();
      
        changes.ingredients
        .forEach(async ingredient => {
          ingredientInsert = {name:ingredient, recipe_id:recipeId }
          await db('ingredients')
          .INSERT(ingredientInsert)
        });
      };
  
      if(firstInst !== changes.instructions) {
        
        await db('instructions')
        .JOIN('recipes', 'recipes.id', 'instructions.recipe_id')
        .SELECT('instructions.*')
        .WHERE({'instructions.recipe_id':recipeId })
        .del();
      
        changes.instructions
        .forEach(async instruction => {
          instructionInsert = {name:instruction, recipe_id:recipeId }
          await db('instructions')
          .INSERT(instructionInsert)
        });
      };
  
      if(firstCat !== changes.category) {
  
        await db('category')
          .JOIN('recipes', 'recipes.id', 'category.recipe_id')
          .SELECT('category.*')
          .WHERE({'category.recipe_id':recipeId })
          .del();
      
        changes.category
        .forEach(async category => {
          categoryAdd= {category:category, recipe_id:recipeId }
          await db('category')
          .INSERT(categoryAdd)
        });
      };
    };
  
  };
  


module.exports = {
    find, 
    findById,
    add,
    update,
    remove
};