import { any, array, z, object, string, TypeOf, boolean } from "zod";
import { createPersonSchema } from './person.schema';

export const createEmployeeSchema = object({
  body: object({
    isActive: boolean(),
    person: createPersonSchema
  })
});

export const updateEmployeeSchema = object({
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


export type CreateEmployeeInput = TypeOf<typeof createEmployeeSchema>["body"];

export type UpdateEmployeeInput = TypeOf<typeof updateEmployeeSchema>["body"];

