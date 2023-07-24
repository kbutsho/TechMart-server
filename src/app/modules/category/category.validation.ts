import { z } from 'zod';

const categoryZodSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: 'categoryId is required!'
    }),
    name: z.string({
      required_error: 'name is required!'
    }),
    title: z.string({
      required_error: 'title is required!'
    }),
    description: z.string({
      required_error: 'description is required!'
    }),
    image: z.string({
      required_error: 'image is required!'
    }),
    status: z.string({
      required_error: 'status is required!'
    }),
  })
});

export const CategoryValidation = {
  categoryZodSchema
};
