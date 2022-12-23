const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repassword: Joi.string().required().valid(Joi.ref('password')),
    name: Joi.string().required(),
    first_name: Joi.string().required(),
    tel: Joi.string().required(),
    adress: Joi.string().required()
    
});

module.exports = schema;