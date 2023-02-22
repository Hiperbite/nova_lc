import { any, array, z, object, string, TypeOf, boolean } from "zod";
import { createPersonSchema } from '../common/person.schema';

export const createStudentSchema = object({
  body: object({
    isActive: boolean().optional(),
    person: createPersonSchema
  })
});

export const updateStudentSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }).optional().nullable(),
    lastName: string({
      required_error: "Last name is required",
    }).optional().nullable(),
    birthDate: any()/*date({
      required_error: "Birth date is required",
    })*/.optional().nullable(),
    nationality: string({
      required_error: "Nationality is required",
    }).optional().nullable(),
    idcard: string({
      required_error: "ID Card is required",
    }).optional().nullable(),


  }),
});


export type CreateStudentInput = TypeOf<typeof createStudentSchema>["body"];

export type UpdateStudentInput = TypeOf<typeof updateStudentSchema>["body"];

