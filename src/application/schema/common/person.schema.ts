import { any, array, z, object, string, TypeOf } from "zod";

export const createPersonSchema = object({
  //body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    birthDate: any()/*date({
        required_error: "Birth date is required",
      })*/,
    nationality: string({
      required_error: "Nationality is required",
    }),
   /* idcard: string({
      required_error: "ID Card is required",
    }),*/
    contacts: array(z.object({
      descriptions: string(),
      type: string(),
    })).min(1).nullable(),
  //})
});

export const updatePersonSchema = object({
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
   /* idcard: string({
      required_error: "ID Card is required",
    }).optional().nullable(),
*/

  }),
});


export type CreatePersonInput = TypeOf<typeof createPersonSchema>//["body"];

export type UpdatePersonInput = TypeOf<typeof updatePersonSchema>["body"];

