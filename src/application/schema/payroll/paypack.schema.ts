import { any, array, z, object, string, TypeOf, boolean, number } from "zod";

export const createPaypackSchema = object({
  body: object({
    value: number().optional(),
    descriptions: string().optional(),
    employeeId: string(),
    transactionTypeId: string()
  })
});

export const updatePaypackSchema = object({
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


export type CreatePaypackInput = TypeOf<typeof createPaypackSchema>["body"];

export type UpdatePaypackInput = TypeOf<typeof updatePaypackSchema>["body"];

