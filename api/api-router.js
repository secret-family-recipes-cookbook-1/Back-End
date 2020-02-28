const router = require('express').Router();

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
    res.json({api: "If you can\'t take the heat, stay out of the kitchen"});
});

module.exports = router;
