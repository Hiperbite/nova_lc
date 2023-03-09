import { any, object, z, string, TypeOf, boolean, preprocess, number } from "zod";
import { createPersonSchema } from '../common/person.schema';
const numericString = (schema: z.ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10);
    } else if (typeof a === 'number') {
      return a;
    } else {
      return undefined;
    }
  }, schema) //as z.ZodEffects<z.ZodTypeAny, number, number>;

export const createClassSchema = object({
  body: object({
    isActive: boolean().optional(),
    code: string().min(3).max(20),
    descriptions: string().optional().nullable().optional(),
    classeRoomId: z.string().uuid(),
    semester: numericString(z.number().positive().max(14)),
    periodId: z.string().uuid(),
    courseId: z.string().uuid()
  })
});

export const updateClassSchema = object({
  body: object({
    isActive: boolean().optional(),
    code: string().min(3).max(20).optional(),
    descriptions: string().optional().nullable().optional(),
    classeRoomId: z.string().uuid().optional(),
    semester: numericString(z.number().positive().max(14)).optional(),
    periodId: z.string().uuid().optional(),
    courseId: z.string().uuid().optional()
  })
})


export type CreateClassInput = TypeOf<typeof createClassSchema>["body"];

export type UpdateClassRoomInput = TypeOf<typeof updateClassSchema>["body"];

