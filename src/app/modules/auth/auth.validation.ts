import { z } from 'zod';

const loginZodSchema = z.object({
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
  })
});

const authServiceLoginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'invalid email format!'
    }),
    firstName: z.string({
      required_error: 'first name is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'first name is required!'
    }),
    lastName: z.string().optional(),
    phone: z.string().optional(),
  })
});

export const AuthValidation = {
  loginZodSchema,
  authServiceLoginZodSchema
};
