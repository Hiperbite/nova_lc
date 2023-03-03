
import express from "express";
import { ModelCtor } from "sequelize-typescript";
import { ModelApi } from "../../api/common/common.api";

import { Address, Contact, Document, Person } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";


const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(
const router = express.Router()

interface modelsType {
  key: string,
  model: any
}

const models: modelsType[] = [{
  key: 'contacts', model: Contact
},{
  key: 'address', model: Address
},{
  key: 'persons', model: Person
},
{
  key: 'documents', model: Document
}]

models.forEach(({ model, key }: modelsType) => {
  let api = new ModelApi<typeof model>(new Repository(model))
  router.post(
    `/commons/${key}/`,
    // validateResource(createStudentSchema),
    asyncHandler(api.create)
  )

    .put(
      `/commons/${key}/:id`,
      // validateResource(updateStudentSchema),
      asyncHandler(api.update)
    )

    .get(
      `/commons/${key}/:id`,
      asyncHandler(api.find)
    )

    .get(
      `/commons/${key}/`,
      asyncHandler(api.findBy)
    );

})

export default router;