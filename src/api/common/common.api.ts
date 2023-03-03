import { Request, Response } from "express";
import { AcademicPeriod, AcademicShift, Model, Contact, EnrollmentConfirmation } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ModelApi<Model> {
  constructor(private repo: IRepository<Model>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const model: Model | void = await this.repo.create(body,{include:{all:true}});

    return res.json(model);
  };
  update = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;
    const { body: models, } = req;
    const { updatedById } = models
    let finalModel = []

    if (Array.isArray(models)) {

      for (let model of models)

        if (model.id) {
          finalModel.push(await this.repo.update({ ...model, updatedById }, { where: { id: model.id }, returning: true }));
        } else {
          finalModel.push(await this.repo.create({ ...model, updatedById }));
        }

      return res.json(finalModel);

    } else {
      const updatedModel = await this.repo.update({ ...models, updatedById }, { where: { id: models.id }, returning: true })
      
      return res.json(updatedModel);

    }


  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query: opts } = req;


    const model: Model | undefined = await this.repo.one(
      id,
      { ...opts, include:{all:true} }
    );
    return res.json(model);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const models: Paginate<Model> | undefined =
      await this.repo.paginated({ ...req.query , include:{all:true}});
    return res.json(models);
  };
}

//export default new ModelApi(new Repository(Model));
export { ModelApi };
