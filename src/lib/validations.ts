import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z.string().min(2).optional(),
  description: z.string().optional(),
  richContent: z.string().optional(),
  price: z.number().positive().optional().nullable(),
  priceOnRequest: z.boolean().default(false),
  sku: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  tags: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
  active: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type LoginInput = z.infer<typeof loginSchema>;
