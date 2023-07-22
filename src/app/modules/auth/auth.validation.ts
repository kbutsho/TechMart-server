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

const loginWithServiceZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'invalid email format!'
    }),
    firstName: z.string({
      required_error: 'firstName is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'firstName is required!'
    }),
    lastName: z.string().optional(),
    role: z.string({
      required_error: 'role is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'role is required!'
    }),
    isAuthService: z.boolean({
      required_error: 'authService status is required!'
    })
  })
});

export const AuthValidation = {
  loginZodSchema,
  loginWithServiceZodSchema
};
