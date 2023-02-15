import { any, array, z, object, string, TypeOf, boolean, number } from "zod";

export const createTransactionTypeSchema = object({
  body: object({
    code: string({
      required_error: "Code is required",
    }),
    name: string({
      required_error: "Name name is required",
    }),
    description: string().optional(),
    defaultValue: number().optional(),
    unit: string().optional(),
    calc: string().optional(),
    debit: boolean({
      required_error: "Debit is required",
      invalid_type_error: "Debit must be a boolean"
    }),
    order: number().optional(),
    referenceTypeId: string().optional()  ,
    
  }).refine(
    (data:any) => !!data.defaultValue || !!data.referenceTypeId,
    'Either defaultValue or referenceTypeId should be filled in.',
    
  )
});

export const updateTransactionTypeSchema = object({
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


export type CreateTransactionTypeInput = TypeOf<typeof createTransactionTypeSchema>["body"];

export type UpdateTransactionTypeInput = TypeOf<typeof updateTransactionTypeSchema>["body"];

