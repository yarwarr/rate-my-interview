import * as z from "zod"
export const companySchema = z.object({
    limit: z.number().default(10),
    offset: z.number().default(0),
    sort: z
      .string()
      .regex(/^\w+.(asc|desc)$/)
      .optional()
      .nullable(),
  });