import { Request, Response } from "express";
import { Classe, ClasseRoom, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ClasseRoomApi {
  constructor(private repo: IRepository<ClasseRoom>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const classRoom: ClasseRoom | void = await this.repo.create(body);

    return res.status(201).json(classRoom);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const classeRoom = await this.repo.update({ ...body, id }, { returning: true });

    return res.json(classeRoom);

  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const classRoom: ClasseRoom | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(classRoom);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {

    const include = [{ model: Classe }]
    const classRooms: Paginate<ClasseRoom> | undefined =
      await this.repo.paginated({ include, ...req.query });
    return res.json(classRooms);
  };
}

export default new ClasseRoomApi(new Repository(ClasseRoom));
export { ClasseRoomApi };
