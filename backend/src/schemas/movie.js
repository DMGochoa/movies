const Joi = require('joi');

const validCategories = ['Action', 'Science Fiction', 'Drama', 'Thriller', 'Horror', 'Comedy']
const currentYear = new Date().getFullYear();

const title = Joi.string()
                .trim()
                .pattern(new RegExp('^[A-Za-z0-9 ]+$'))
                .min(2)
                .max(50)
                .messages({
                  'string.base': 'Title must be a string',
                  'string.empty': 'Title must not be empty',
                  'string.min': 'Title must have at least {#limit} characters',
                  'string.max': 'Title must have a maximum of {#limit} characters',
                  'string.pattern.base': 'Title must only contain letters, numbers and spaces'
                });
const category = Joi.string()
                .valid(...validCategories)
                .messages({
                  'string.base': 'Category must be a string',
                  'string.empty': 'Category must not be empty',
                  'any.only': 'Category is not in the correct format. Only the following categories are allowed: Action, Science Fiction, Drama, Thriller, Horror, and Comedy.'
                });
const releaseYear = Joi.number().integer().min(1888).max(currentYear);

const createMovieSchema = Joi.object({
    title: title.required(),
    category: category.required(),
    releaseYear: releaseYear.required()
});

module.exports = { createMovieSchema };
