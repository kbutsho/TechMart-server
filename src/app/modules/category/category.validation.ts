import { z } from 'zod';
import { categoryStatus } from './category.constant';
import { ICategoryStatus } from './category.interface';

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
    coverPhoto: z.string({
      required_error: 'cover photo is required!'
    }).refine((value) => value.trim() !== '', {
      message: `cover photo cannot be empty!`,
    }),
    status: z.string({
      required_error: 'status is required!'
    }).refine((value) => categoryStatus.includes(value as ICategoryStatus), {
      message: `status should be ${categoryStatus.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    })
  })
});

export const CategoryValidation = {
  categoryZodSchema
};
