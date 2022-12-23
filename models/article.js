const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.string().required(),
    id_users: Joi.string(),
    id_categories: Joi.string()

});

module.exports = schema;