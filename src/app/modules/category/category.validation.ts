import { z } from 'zod';

const categoryZodSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: 'categoryId is required!'
    }).refine((value) => value.trim() !== '', {
      message: `categoryId cannot be empty!`,
    }),
    name: z.string({
      required_error: 'name is required!'
    }).refine((value) => value.trim() !== '', {
      message: `name cannot be empty!`,
    }),
    title: z.string({
      required_error: 'title is required!'
    }).refine((value) => value.trim() !== '', {
      message: `title cannot be empty!`,
    }),
    description: z.string({
      required_error: 'description is required!'
    }).refine((value) => value.trim() !== '', {
      message: `description cannot be empty!`,
    }),
    image: z.string({
      required_error: 'image is required!'
    }).refine((value) => value.trim() !== '', {
      message: `image cannot be empty!`,
    }),
    status: z.string({
      required_error: 'status is required!'
    }).refine((value) => value.trim() !== '', {
      message: `status cannot be empty!`,
    }),
  })
});

export const CategoryValidation = {
  categoryZodSchema
};
