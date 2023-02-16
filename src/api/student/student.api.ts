import { Request, Response } from "express";
import { Student, Contact } from "../../models/index";
import { StudentRepository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class StudentApi {
  constructor(private repo: IRepository<Student>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const student: Student | void = await this.repo.create(body);

    return res.json(student);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const student = await this.repo.update({ ...body, id });

    const updatedStudent = await this.repo.one(id);

    await updatedStudent?.update(body, { returning: true });

    return res.json(updatedStudent);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const student: Student | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(student);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const students: Array<Student> | undefined =
      await this.repo.all({});
    return res.json(students);
  };
}

export default new StudentApi(new StudentRepository());
export { StudentApi };
