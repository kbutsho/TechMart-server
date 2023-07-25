import { IBrandStatus } from './brand.interface';
import { z } from 'zod';
import { brandStatus } from './brand.constant';

const brandZodSchema = z.object({
  body: z.object({
    brandId: z.string({
      required_error: 'brandId is required!'
    }).refine((value) => value.trim() !== '', {
      message: `brandId cannot be empty!`,
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
    }).refine((value) => brandStatus.includes(value as IBrandStatus), {
      message: `status should be ${brandStatus.join(', ').replace(/,([^,]*)$/, ' or$1')}`,
    })
  })
});

export const BrandValidation = {
  brandZodSchema
};
