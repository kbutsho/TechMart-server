import { z } from 'zod';

const categoryZodSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: 'categoryId is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'categoryId is required!',
    }),
    name: z.string({
      required_error: 'name is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'name is required!',
    }),
    title: z.string({
      required_error: 'title is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'title is required!',
    }),
    description: z.string({
      required_error: 'description is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'description is required!',
    }),
    image: z.string({
      required_error: 'image is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'image is required!',
    }),
    status: z.string({
      required_error: 'status is required!'
    }).refine((value) => value.trim() !== '', {
      message: 'status is required!',
    }),
  })
});

export const CategoryValidation = {
  categoryZodSchema
};
