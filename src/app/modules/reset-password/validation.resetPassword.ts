import { z } from 'zod';

const sendEmail = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required!'
    }).email({
      message: 'invalid email format!'
    }),
  })
});

const resetPassword = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'password is required!'
    }),
    confirmPassword: z.string({
      required_error: 'confirm password is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'confirm password is required!'
    })
  })
}).refine(data => data.body.password === data.body.confirmPassword, {
  message: 'confirm password not match!',
  path: ["confirmPassword"]
});

export const ResetPasswordValidation = {
  sendEmail, resetPassword
};
