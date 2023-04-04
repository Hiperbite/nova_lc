import { Request, Response } from "express";
import { Op } from "sequelize";
import { Person, Track, User } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/iRepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class TrackApi {
  constructor(private repo: IRepository<Track>) { };

  create = async (req: Request, res: Response): Promise<Response> => {
    return res.status(403).json();
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    return res.status(403).json();
  };
  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query: opts } = req;
    const include = [User];

    const track: Track | undefined = await this.repo.one(
      id,
      { ...opts, include }
    );
    return res.json(track);
  };
  findBy = async (req: Request, res: Response): Promise<Response> => {
    const include = [{ model: User, include: Person }];
    let where: any = req?.query?.where;

    if (where?.model)
      where.
        model = {
        [Op.in]: where?.model.split(',')
      }

    if (where?.ref)
      where.
        ref = {
        [Op.in]: where?.ref?.split(',')
      }

    const tracks: Paginate<Track> | undefined =
      await this.repo.paginated({ ...req.query, where: { ...where }, include });
    return res.json(tracks);
  };
}

export default new TrackApi(new Repository(Track));
export { TrackApi };
