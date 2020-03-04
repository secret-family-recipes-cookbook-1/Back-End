require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_secret, (err, decodedToken) => {
            if(err) {
                console.log('failed to verify', err);
                res.status(401).json
                ({
                    success: false, 
                    errorMessage: 'AuthMW: Sorry, you are not authorized to be here.'
                });
            } else {
                req.user = {password:decodedToken.password};
                next();
            }
        });
    } else {
        res.status(401).json 
        ({
            success: false, 
            errorMessage: 'AuthMW: Well that didn\'t work!'
        })
    };
};