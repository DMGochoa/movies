// validatorHandler.test.js
const validatorHandler = require('../../middlewares/validatorHandler');
const { createMovieSchema } = require('../../schemas/movie');
const boom = require('@hapi/boom');

describe('validatorHandler', () => {
  const middleware = validatorHandler(createMovieSchema, 'body');
  it('Title field must not be empty', () => {
    const request = {
      body: {
        title: '',
        category: 'Science Fiction',
        releaseYear: 2010
      }
    };
    const next = jest.fn();
    middleware(request, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(boom.Boom));
    const errorArgument = next.mock.calls[0][0];
    expect(errorArgument.isBoom).toBe(true);
    expect(errorArgument.output.statusCode).toBe(400);
    expect(errorArgument.output.payload.message).toBe("Title must not be empty");
  });

  it('Title field should only allow letters, numbers, and spaces.', () => {
    const request = {
      body: {
        title: 'The Matrix 2@',
        category: 'Science Fiction',
        releaseYear: 2010
      }
    };
    const next = jest.fn();
    middleware(request, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(boom.Boom));
    const errorArgument = next.mock.calls[0][0];
    expect(errorArgument.isBoom).toBe(true);
    expect(errorArgument.output.statusCode).toBe(400);
    expect(errorArgument.output.payload.message).toBe("Title must only contain letters, numbers and spaces");
  });

  it ('Title field must be 50 characters or fewer', () => {
    const request = {
      body: {
        title: 'a'.repeat(51),
        category: 'Science Fiction',
        releaseYear: 2010
      }
    };
    const next = jest.fn();
    middleware(request, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(boom.Boom));
    const errorArgument = next.mock.calls[0][0];
    expect(errorArgument.isBoom).toBe(true);
    expect(errorArgument.output.statusCode).toBe(400);
    expect(errorArgument.output.payload.message).toBe("Title must have a maximum of 50 characters");

  });

  it ('Category field must not be empty', () => {
    const request = {
      body: {
        title: 'Inception',
        category: '',
        releaseYear: 2010
      }
    };
    const next = jest.fn();
    middleware(request, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(boom.Boom));
    const errorArgument = next.mock.calls[0][0];
    expect(errorArgument.isBoom).toBe(true);
    expect(errorArgument.output.statusCode).toBe(400);
    expect(errorArgument.output.payload.message).toBe("Category is not in the correct format. Only the following categories are allowed: Action, Science Fiction, Drama, Thriller, Horror, and Comedy.. Category must not be empty");

  });

  it ('Category field only allows: Action, Science Fiction, Drama, Thriller, Horror, and Comedy.', () => {
    const request = {
      body: {
        title: 'Inception',
        category: 'Romance',
        releaseYear: 2010
      }
    };
    const next = jest.fn();
    middleware(request, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(boom.Boom));
    const errorArgument = next.mock.calls[0][0];
    expect(errorArgument.isBoom).toBe(true);
    expect(errorArgument.output.statusCode).toBe(400);
    expect(errorArgument.output.payload.message).toBe("Category is not in the correct format. Only the following categories are allowed: Action, Science Fiction, Drama, Thriller, Horror, and Comedy.");
  });

  it('Should call next() with no arguments if data is valid', () => {
    const request = {
      body: {
        title: 'Inception',
        category: 'Science Fiction',
        releaseYear: 2010
      }
    };
    const next = jest.fn();


    middleware(request, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });
});
