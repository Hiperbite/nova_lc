import { Request, Response } from "express";
import { Enrollment, Student, Person } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class EnrollmentApi {
  constructor(private repo: IRepository<Enrollment>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const st = await Student.findByPk(body.studentId);

    const enrollment: Enrollment | void =
      await Enrollment.create(body);

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
    const { query }: any = req;
    const opts: any = { ...query }
    const enrollment: Enrollment | undefined = await this.repo.one(
      id,
      opts
    );
    return res.json(enrollment);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const include = [{ model: Student, include: Person }]
    const options = {...req.query, include}
    
    const enrollments: Paginate<Enrollment>| undefined = await this.repo.paginated( options);
    return res.json(enrollments);
  };
}

export default new EnrollmentApi(new Repository(Enrollment));
export { EnrollmentApi };
