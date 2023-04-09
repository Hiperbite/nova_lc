import { StudentApp } from './../../application/student/student.app';
import { Request, Response } from "express";
import { Op } from "sequelize";
import sendEmail, { mailServices } from "../../application/mailler/index";
import { Student, Person, Enrollment, Course } from "../../models/index";
import { StudentRepository } from "../../repository/index";
import IRepository from "../../repository/iRepository";
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
    const { query, queryPerson } = StudentApp.filters.basicQuery(req.query?.where ?? {})
    const {
      page,
      pageSize,
      scope } = req.query;
    const include = [
      {
        model: Person,
        where: queryPerson,
      }, {
        model: Course
      }]
    const options: any = {
      where: query,
      scope,
      include,
      page,
      pageSize,
    }


    const { q } = req.query
    if (q) {

      const students: Student[] | any = await this.repo.all(
        {
          subQuery: false,
          where: {
            [Op.or]: [
              { ['$person.lastName$']: { [Op.like]: `%${q}%` } },
              { ['$person.firstName$']: { [Op.like]: `%${q}%` } },
              { code: q }
            ]
          },
          include: [Person.scope('empty')],
          order: [[Person, "firstName", "ASC"]],
          offset: 0,
          limit: 10,
        }
      );
      return res.json(students);

    } else {
      const students: Paginate<Student> | undefined = await this.repo.paginated(
        options
      );

      return res.json(students);
    }
  };
}

export default new StudentApi(new StudentRepository());
export { StudentApi };
