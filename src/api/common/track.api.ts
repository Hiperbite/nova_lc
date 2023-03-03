import { Request, Response } from "express";
import { Person, Track, User } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/irepository";
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
    const include = [{model:User,include:Person}];
    const tracks: Paginate<Track> | undefined =
      await this.repo.paginated({ ...req.query, include });
    return res.json(tracks);
  };
}

export default new TrackApi(new Repository(Track));
export { TrackApi };
