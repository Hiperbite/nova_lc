import { z } from 'zod'

const paginateQuery= z.object({
  limit: z.number().min(1).max(100).optional(),
  page: z.number().min(1).max(100).optional(),
  attributes: z.string().min(10).max(14).optional(),
 });

export const validatePaginateQuery = (inputs: unknown) => {
  const isValidData = paginateQuery.parse(inputs);
  return isValidData;
};
