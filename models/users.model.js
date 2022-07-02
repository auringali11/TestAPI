const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required()
});

module.exports = { schema };