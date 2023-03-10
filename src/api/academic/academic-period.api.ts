import { Request, Response } from "express";
import { Period, Classe } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  findBy(req: Request, res: Response): Promise<Response>;
}
class PeriodApi implements IApi {
  constructor(private repo: IRepository<Period>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const period: Period | void = await this.repo.create(body);

    return res.json(period);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

   const updatedPeriod = await this.repo.update({ ...body, id });

    return res.json(updatedPeriod);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const period: Period | undefined = await this.repo.one(
      id,
      {...query,
      include: [Classe]}
    );
    return res.json(period);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const periods: Array<Period> | undefined =
      await this.repo.all({include: [Classe]});
    return res.json(periods);
  };
}

export default new PeriodApi(new Repository(Period));

export { PeriodApi };
