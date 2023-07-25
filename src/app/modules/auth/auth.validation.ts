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
      message: 'password cannot be empty!'
    }),
  })
});

const loginWithGoogleZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'invalid email format!'
    }),
    firstName: z.string({
      required_error: 'firstName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'firstName cannot be empty!'
    }),
    lastName: z.string().optional(),
    role: z.string({
      required_error: 'role is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'role cannot be empty!'
    }),
    isGoogleLogin: z.boolean({
      required_error: 'isGoogleLogin status is required!'
    }).refine((value) => value === true, {
      message: 'isGoogleLogin status must be true!'
    })
  })
});

export const AuthValidation = {
  loginZodSchema,
  loginWithGoogleZodSchema
};
