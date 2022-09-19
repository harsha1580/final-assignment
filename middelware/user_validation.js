const validator = require('../helper/validate');
const signUp= async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "username": "required|string|min:4",
        "password": "required|string|min:6",
        "isAdmin": "Boolean"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const signIn= async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "password": "required|string|min:6",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
module.exports = {
    signUp,
    signIn
};