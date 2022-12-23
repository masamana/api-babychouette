const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required(),
    first_name: Joi.string().required(),
    tel: Joi.string().required(),
    adress: Joi.string().required()

});

module.exports = schema;