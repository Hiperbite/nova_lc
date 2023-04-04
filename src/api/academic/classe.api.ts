import { Request, Response } from "express";
import { Period, Classe, ClasseRoom, Course, TimeTable, Enrollment, CurricularPlan } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/iRepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ClasseApi {
  constructor(private repo: IRepository<Classe>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const classe: Classe | void = await this.repo.create(body);

    return res.json(classe);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    // const classe = await this.repo.update({ ...body, id });

    const updatedClasse = await this.repo.one(id);

    await updatedClasse?.update(body, { returning: true });

    return res.json(updatedClasse);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query: opts } = req;
    const include = [ClasseRoom, Course, TimeTable, Period, Enrollment];

    const classe: Classe | undefined = await this.repo.one(
      id,
      { ...opts, include }
    );
    return res.json(classe);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const include = [Period, ClasseRoom, {model:Course,include:[CurricularPlan]}, Enrollment];
    const classes: Paginate<Classe> | undefined =
      await this.repo.paginated({ ...req.query, include });
    return res.json(classes);
  };
}

export default new ClasseApi(new Repository(Classe));
export { ClasseApi };
