import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { validatePaginateQuery } from "../schema/default";

const validateResource =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        if (!validatePaginateQuery(req.query))
          throw 'Error validatePaginateQueryQuery validation'
        
        next();
      } catch (e: any) {
        return res.status(400).send(e.errors);
      }
    };

export default validateResource;