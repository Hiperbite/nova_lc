import { any, array, z, object, string, TypeOf, boolean } from "zod";
import { createPersonSchema } from '../common/person.schema';

const roles = [
  'SECRETARY',
  'TEACHER',
  'CORDENATOR',
  'SUPERVISOR'
] as const;

export const createStaffSchema = object({
  body: object({
    isActive: boolean().optional(),
    roles: array(z.enum(roles)).optional(),
    person: createPersonSchema
  })
});

export const updateStaffSchema = object({
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


export type CreateStaffInput = TypeOf<typeof createStaffSchema>["body"];

export type UpdateStaffInput = TypeOf<typeof updateStaffSchema>["body"];

