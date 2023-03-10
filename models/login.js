const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()

});

module.exports = schema;