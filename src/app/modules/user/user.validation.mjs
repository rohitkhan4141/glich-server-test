import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z.string().min(1).max(255).optional(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});


export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema
};
