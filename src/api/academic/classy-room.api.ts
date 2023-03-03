import { Request, Response } from "express";
import { Classy, ClassyRoom, Contact } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class ClassyRoomApi {
  constructor(private repo: IRepository<ClassyRoom>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const classRoom: ClassyRoom | void = await this.repo.create(body);

    return res.status(201).json(classRoom);
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    //const classRoom = await this.repo.update({ ...body, id }, { returning: true });

    const classyRoom = await this.repo.one(id);
    if (classyRoom) {
      const success = await classyRoom?.update(body, { returning: true });
      return res.json(classyRoom);
    }else{
      return res.status(404).send('response not found');
    }
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

    const include = [{ model: Classy }]
    const classRooms: Paginate<ClassyRoom> | undefined =
      await this.repo.paginated({ include, ...req.query });
    return res.json(classRooms);
  };
}

export default new ClassyRoomApi(new Repository(ClassyRoom));
export { ClassyRoomApi };
