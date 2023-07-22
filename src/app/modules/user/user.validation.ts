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
      message: 'password is required!'
    }),
    firstName: z.string({
      required_error: 'firstName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'firstName is required!'
    }),
    lastName: z.string({
      required_error: 'lastName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'lastName is required!'
    }),
    role: z.string({
      required_error: 'role is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'role is required!'
    }),
  })
});


export const UserValidation = {
  createUser
};
