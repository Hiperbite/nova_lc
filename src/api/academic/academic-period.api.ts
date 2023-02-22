import { Request, Response } from "express";
import { AcademicPeriod } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  find(req: Request, res: Response): Promise<Response>;
  findBy(req: Request, res: Response): Promise<Response>;
}
class AcademicPeriodApi implements IApi {
  constructor(private repo: IRepository<AcademicPeriod>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const academicPeriod: AcademicPeriod | void = await this.repo.create(body);

    return res.json(academicPeriod);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const academicPeriod = await this.repo.update({ ...body, id });

    const updatedAcademicPeriod = await this.repo.one(id);

    await updatedAcademicPeriod?.update(body, { returning: true });

    return res.json(updatedAcademicPeriod);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const academicPeriod: AcademicPeriod | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(academicPeriod);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const academicPeriods: Array<AcademicPeriod> | undefined =
      await this.repo.all({});
    return res.json(academicPeriods);
  };
}

export default new AcademicPeriodApi(new Repository(AcademicPeriod));

export { AcademicPeriodApi };
