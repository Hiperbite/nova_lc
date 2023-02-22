import { Request, Response } from "express";
import { EnrollmentConfirmation, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class EnrollmentConfirmationApi {
  constructor(private repo: IRepository<EnrollmentConfirmation>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const enrollment: EnrollmentConfirmation | void = await this.repo.create(body);

    return res.json(enrollment);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const enrollment = await this.repo.update({ ...body, id });

    const updatedEnrollmentConfirmation = await this.repo.one(id);

    await updatedEnrollmentConfirmation?.update(body, { returning: true });

    return res.json(updatedEnrollmentConfirmation);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const enrollment: EnrollmentConfirmation | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(enrollment);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const enrollments: EnrollmentConfirmation[] | undefined = await this.repo.all({});
    return res.json(enrollments);
  };
}

export default new EnrollmentConfirmationApi(new Repository(EnrollmentConfirmation));
export { EnrollmentConfirmationApi };
