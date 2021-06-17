const Joi = require('joi');

module.exports.todoSchema = Joi.object({
    todo: Joi.object({
        name: Joi.string().required(),
        details: Joi.string().required()
    }).required()
});