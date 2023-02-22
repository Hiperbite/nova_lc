import { Request, Response } from "express";
import { Enrollment, Contact, EnrollmentConfirmation } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class EnrollmentApi {
  constructor(private repo: IRepository<Enrollment>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const enrollment: Enrollment | void = await this.repo.create(body,{include:[EnrollmentConfirmation]});

    return res.json(enrollment);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const enrollment = await this.repo.update({ ...body, id });

    const updatedEnrollment = await this.repo.one(id);

    await updatedEnrollment?.update(body, { returning: true });

    return res.json(updatedEnrollment);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query }:any = req;
    const opts:any = {...query,...{include: [EnrollmentConfirmation]}}
    const enrollment: Enrollment | undefined = await this.repo.one(
      id,
      opts
    );
    return res.json(enrollment);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const enrollments: Enrollment[] | undefined = await this.repo.all({});
    return res.json(enrollments);
  };
}

export default new EnrollmentApi(new Repository(Enrollment));
export { EnrollmentApi };
