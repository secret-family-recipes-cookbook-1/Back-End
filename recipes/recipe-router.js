const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');

const Recipes = require('./recipes-model');

router.get('/', restrict, (req, res) => {
    const user = req.user.id;

    Recipes.getRecipes(user)
        .then(recipes => {
            res.status(200).json
            ({ recipes });
        })
        .catch(error => {
            res.status(500).json
            ({
                success: false,
                 errorMessage: "no userfound", error
            })
        });
})

router.get('/:id', restricted, (req, res) => {
    const user = req.user.id;
    const recipeId = req.params.id;

    Recipes.getRecipeById(recipeId, user)
        .then(recipe => {
            res.status(200).json
            ({recipe});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json
            ({
                success:false,
                errorMessage: "no recipe found with that id", error
            })
        })
})

router.post('/', restricted, (req,res) => {
    const user = req.user.id;
    const recipeId = req.body;

    Recipes.addRecipe(recipeId, user)
        .then(recipes => {
            res.status(201).json(recipes);
        })
        .catch(error => {
            res.status(500).json
            ({
                success:false,
                errorMessage: 'no recipe added', error
            })
        })
})

router.delete('/:id', restricted, (req, res) => {
    const user = req.user.id;
    const recipeId = req.params.id;

    Recipes.deleteRecipe(recipeId, user)
        .then(recipes => {
            res.status(204).json
            ({
                success:true,
                message: 'recipe deleted', recipes
            })
        })
        .catch(error => {
            res.status(500).json
            ({
                success:false,
                errorMessage: 'We cannot find that recipe', error
            })
        })
    })

    router.put('/:id', restricted, (req, res) => {
        const user = req.user.id;
        const recipeId = req.params.id;
        const recipeUpdate = res.body;

        Recipes.updateRecipe(recipeId, user, recipeUpdate)
        .then(response => {
            res.status(200).json
            ({
                success:true,
                message: 'Recipe updated successfully', response
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json
            ({
                sucess:false,
                errorMessage: 'oops. That didn\'t work. Try again', error
            })
        })
    })

    module.exports = router;