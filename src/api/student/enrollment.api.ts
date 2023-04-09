import { Request, Response } from "express";
import { EnrollmentApp } from "../../application/student/enrollment.app";
import { Enrollment, Student, Person, Classe, Assessment } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/iRepository";
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
    const opts: any = { ...query, include: [Assessment] }
    const enrollment: Enrollment | undefined = await this.repo.one(
      id,
      opts
    );
    return res.json(enrollment);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const { query, queryClass, queryStudent, queryStudentPerson } = EnrollmentApp.filters.basicQuery(req.query?.where ?? {})
    const {
      page,
      pageSize,
      scope } = req.query;
    const include = [
      {
        model: Student,
        where: queryStudent,
        include: [{
          model: Person,
          where: queryStudentPerson
        }]
      }, {
        model: Classe,
        where: queryClass
      }]
    const options: any = {
      where: query,
      scope,
      include: scope ? undefined : include,
      page,
      pageSize,
    }

    const enrollments: Paginate<Enrollment> | undefined = await this.repo.paginated(options);
    return res.json(enrollments);
  };
}

export default new EnrollmentApi(new Repository(Enrollment));
export { EnrollmentApi };
