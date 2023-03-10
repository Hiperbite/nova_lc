import { object, z, string, TypeOf, boolean } from "zod";

export const createPeriodSchema = object({
  body: object({
    isActive:
      boolean()
        .optional(),
    code:
      string()
        .min(2)
        .max(20),
    descriptions:
      string()
        .optional()
        .nullable()
        .optional(),
  })
});

export const updatePeriodSchema = object({
  body: object({
    isActive:
      boolean()
        .optional(),
    code:
      string()
        .min(2)
        .max(20)
        .optional(),
    descriptions:
      string()
        .optional()
        .nullable()
        .optional(),
  })
})


export type CreatePeriodRoomInput = TypeOf<typeof createPeriodSchema>["body"];

export type UpdatePeriodRoomInput = TypeOf<typeof updatePeriodSchema>["body"];

