import { Request, Response } from "express";
import { Classy, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ClassyApi {
  constructor(private repo: IRepository<Classy>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const classy: Classy | void = await this.repo.create(body);

    return res.json(classy);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const classy = await this.repo.update({ ...body, id });

    const updatedClassy = await this.repo.one(id);

    await updatedClassy?.update(body, { returning: true });

    return res.json(updatedClassy);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const classy: Classy | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(classy);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const classys: Paginate<Classy> | undefined =
      await this.repo.paginated({});
    return res.json(classys);
  };
}

export default new ClassyApi(new Repository(Classy));
export { ClassyApi };
