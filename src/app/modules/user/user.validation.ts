import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'invalid email format!'
    }),
    password: z.string({
      required_error: 'password is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'password cannot be empty!'
    }),
    firstName: z.string({
      required_error: 'firstName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'firstName cannot be empty!'
    }),
    lastName: z.string({
      required_error: 'lastName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'lastName cannot be empty!'
    }),
    role: z.string({
      required_error: 'role is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'role cannot be empty!'
    }),
  })
});


export const UserValidation = { createUser }
