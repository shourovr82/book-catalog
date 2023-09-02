import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'First name is required',
    }),
    profileImage: z.string({
      required_error: 'Profile image is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});

export const StudentValidation = {
  create,
  update,
};
