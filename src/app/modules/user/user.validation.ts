import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'first name is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'first name is required!'
    }),
    lastName: z.string({
      required_error: 'last name is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'last name is required!'
    }),
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'email is required!'
    }),
    address: z.object({
      country: z.string().refine((value) => value !== '', {
        message: 'country is required!'
      }),
      state: z.string().refine((value) => value !== '', {
        message: 'state is required!'
      }),
      city: z.string().refine((value) => value !== '', {
        message: 'city is required!'
      }),
      street: z.string().refine((value) => value !== '', {
        message: 'street is required!'
      }),
      zipCode: z.string().refine((value) => value !== '', {
        message: 'zip code is required!'
      })
    }).optional(),
    password: z.string({
      required_error: 'password is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'password is required!'
    }),
    confirmPassword: z.string({
      required_error: 'confirm password is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'confirm password is required!'
    }),
    phone: z.string({
      required_error: 'phone is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'phone is required!'
    }),
    role: z.string({
      required_error: 'role is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'role is required!'
    })
  })
}).refine(data => data.body.password === data.body.confirmPassword, {
  message: 'confirm password not match!',
  path: ["confirmPassword"]
});


export const UserValidation = { createUser }
