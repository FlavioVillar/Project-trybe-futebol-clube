import * as joi from 'joi';

const messageSchema = 'All fields must be filled';

const loginSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    'string.empty': messageSchema,
    'string.email': messageSchema,
    'any.required': messageSchema,
  }),
  password: joi.string().required().messages({
    'string.empty': messageSchema,
    'any.required': messageSchema,
  }),
});

export default loginSchema;
