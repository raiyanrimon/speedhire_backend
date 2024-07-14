import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Password must be string",
    }),
    description: z.string({
      invalid_type_error: "Description must be string",
    }),
    color: z.string({
      invalid_type_error: "Color must be string",
    }),
    isElectric: z.boolean(),
    features: z.array(z.string(), {
      invalid_type_error: "features must be an array",
    }),
    pricePerHour: z.number({
      invalid_type_error: "pricePerHour must be number",
    }),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Password must be string",
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: "Description must be string",
      })
      .optional(),
    color: z
      .string({
        invalid_type_error: "Color must be string",
      })
      .optional(),
    isElectric: z.boolean().optional(),
    features: z
      .array(z.string(), {
        invalid_type_error: "features must be an array",
      })
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: "pricePerHour must be number",
      })
      .optional(),
  }),
});

export const CarValidationSchema = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
