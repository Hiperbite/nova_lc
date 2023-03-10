import { Request, Response } from "express";
import { Op } from "sequelize";
import { Student, Person, Enrollment } from "../../models/index";
import { StudentRepository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class StudentApi {
  constructor(private repo: IRepository<Student>) { }

  create = async (req: Request, res: Response): Promise<Response | any> => {
    const { body } = req;

    const student: Student | void = await this.repo.create(body);
    return res.json(student);
  };
  update = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { body } = req;

    const student = await this.repo.update({ ...body, id });

    const updatedStudent = await this.repo.one(id);

    await updatedStudent?.update(body, { returning: true });

    return res.json(updatedStudent);
  };
  find = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { query } = req;

    const student: Student | undefined = await this.repo.one(id, query);
    if (!student) {
      throw { message: "User not found", code: 404 };
    }
    return res.json(student);
  };
  findBy = async (req: Request, res: Response): Promise<Response | void> => {
    const { q } = req.query
    if (q) {

      const students: any | Paginate<Student> | undefined = await this.repo.all(
        {
          subQuery: false,
          where: {
            [Op.or]: [
              { ['$person.lastName$']: { [Op.like]: `%${q}%` } },
              { ['$person.firstName$']: { [Op.like]: `%${q}%` } },
              { code: q }
            ]
          },
          //include: [Enrollment],
          order: [[Person, "firstName", "ASC"]],
          offset: 0,
          limit: 10,
        }
      );
      return res.json(students);

    } else {
      const students: Paginate<Student> | undefined = await this.repo.paginated(
        req.query
      );

      return res.json(students);
    }
  };
}

export default new StudentApi(new StudentRepository());
export { StudentApi };
