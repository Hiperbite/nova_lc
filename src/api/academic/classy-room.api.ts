import { Request, Response } from "express";
import { ClassyRoom, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ClassyRoomApi {
  constructor(private repo: IRepository<ClassyRoom>){};

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const classRoom: ClassyRoom | void = await this.repo.create(body);

    return res.send(201).json(classRoom);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const classRoom = await this.repo.update({ ...body, id }, { returning: true });

    const updatedClassyRoom = await this.repo.one(id);

    const success = await updatedClassyRoom?.update(body, { returning: true });

    return res.json(updatedClassyRoom);
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const classRoom: ClassyRoom | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(classRoom);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const classRooms: Array<ClassyRoom> | undefined =
      await this.repo.all({});
    return res.json(classRooms);
  };
}

export default new ClassyRoomApi(new Repository(ClassyRoom));
export { ClassyRoomApi };
