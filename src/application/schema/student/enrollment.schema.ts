import { any, object, z, string, TypeOf, boolean, preprocess, number } from "zod";

export const createEnrollmentClassSchema = object({
  body: object({
    isActive: boolean().optional(),
    studentId: z.string().uuid(),
    classeId: z.string().uuid()
  })
});

export const updateEnrollmentClassSchema = object({
  body: object({
    isActive: boolean().optional(),
    studentId: z.string().uuid().optional(),
    classeId: z.string().uuid().optional()
  })
})


export type CreateEnrollmentClassInput = TypeOf<typeof createEnrollmentClassSchema>["body"];

export type UpdateEnrollmentClassRoomInput = TypeOf<typeof updateEnrollmentClassSchema>["body"];

