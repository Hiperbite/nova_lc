import { Request, Response } from "express";
import { AcademicShift, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class AcademicShiftApi {
  constructor(private repo: IRepository<AcademicShift>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const academicShift: AcademicShift | void = await this.repo.create(body);

    return res.json(academicShift);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const academicShift = await this.repo.update({ ...body, id });

    const updatedAcademicShift = await this.repo.one(id);

    await updatedAcademicShift?.update(body, { returning: true });

    return res.json(updatedAcademicShift);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const academicShift: AcademicShift | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(academicShift);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const academicShifts: Array<AcademicShift> | undefined =
      await this.repo.all({});
    return res.json(academicShifts);
  };
}

export default new AcademicShiftApi(new Repository(AcademicShift));
export { AcademicShiftApi };
