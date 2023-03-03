import { any, object,z, string, TypeOf, boolean, preprocess, number} from "zod";
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

export  const createSchema = object({
  body: object({
    
    isActive: boolean().optional(),
    code: string().min(3).max(20),
    descriptions: string().optional().nullable().optional(),
    size: numericString(z.number().positive().max(1000))
  })
});

export const updateSchema = object({
  body: object({
    isActive: boolean().optional(),
    code: string().min(3).max(20).optional(),
    descriptions: string().optional().nullable().optional(),
    size: numericString(z.number().positive().max(1000)).optional()
  })
})


export type CreateClassRoomInput = TypeOf<typeof createSchema>["body"];

export type UpdateClassRoomInput = TypeOf<typeof updateSchema>["body"];

