const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    let user = req.body;
    console.log({user})

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json ({
                user: saved
            })
        })
        .catch (error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let {email, password} = req.body;

    Users.findBy({email})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json
            ({
                success:true,
                message: `Welcome to the Secret Family Cookbook, ${user.firstName}`,
                token 
            });
        } else {
            res.status(401).json
            ({
                success: false, 
                errorMessage: 'Invalid Credentials. Try again'
            });
        }
    })
    .catch(error => {
        res.status(500).json(error)
        console.log('Oops, that did NOT work')
    });
});

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.email
    };

    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, process.env.JWT_Secret, options);
}

module.exports = router;