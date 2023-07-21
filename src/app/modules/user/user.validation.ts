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
    }),
    firstName: z.string({
      required_error: 'firstName is required!',
    }),
    lastName: z.string({
      required_error: 'lastName is required!',
    }),
    role: z.string({
      required_error: 'role is required!'
    }),
    isFirebase: z.boolean({
      required_error: 'isFirebase is required!'
    })
  })
});


export const UserValidation = {
  createUser
};
