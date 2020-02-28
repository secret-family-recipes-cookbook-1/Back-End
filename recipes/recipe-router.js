require('dotenv').config();

const express = require('express')
const router = express()
router.use(express.json());


const knex = require('knex')
const knexConfig = require('../knexfile')
const restricted = require('../auth/restricted-middleware');
const database = knex(knexConfig.development);



router.get('/', restricted, (req, res) => {
  database('recipes').then(recipe => {
    res.status(200).json
    ({
        success:true,
        recipe
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json
    ({
        success:false, 
        error
    });
  })
})


router.post('/', restricted,(req, res) => {
  database('recipes').insert(req.body, ['id', 'name'])
    .then(ids => {
      database('recipes')
        .where({ id: ids[0] })
        .first()
        .then(result => {
          res.status(200).json
          ({
              succes:true,
              result
            })
        })
    })
    .catch(error => {
      res.status(500).json
      ({ 
        success:false,  
        errorMessage: "Unable to add recipe!",
        error 
        })
    })
})

router.put('/:id', restricted, (req, res) => {
    database('recipes')
    .where({id: req.params.id})
    .first()
    .then(recipe => {
        if (recipe) {
          res.status(200).json(recipe);
        } else {
          res.status(404).json
          ({ 
              success:false,
              errorMessage: 'Unable update that recipe' 
            });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      })
})


router.get('/:id', restricted, (req, res) => {
  database('recipes')
    .where({ id: req.params.id })
    .first()
    .then(recipe => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json
        ({ 
            success:false,
            erroMessage: 'Unable to find that recipe' 
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})



router.delete('/:id', restricted, (req, res) => {
  database('recipes')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "Recipe deleted"
        })

      } else {
        res.status(404).json
        ({ 
            success:false,
            errorMessage: 'This recipe does not exist' 
        })
      }

    })
    .catch(error => {
      res.status(500).json(error)
    })

})

module.exports = router;

