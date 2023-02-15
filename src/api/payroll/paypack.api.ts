import { Request, Response } from "express";
import { Paypack, Contact } from "../../models/index";
import { PaypackRepository, Repository } from "../../repository";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}

class PaypackApi {
  constructor(private repo: IRepository<Paypack>) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const paypack: Paypack | void = await this.repo.create(body);

    return res.json(paypack);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;

    const { body } = req;

    const paypack = await this.repo.update({ ...body, id });

    const updatedPaypack = await this.repo.one(id);

    await updatedPaypack?.update(body, { returning: true });

    return res.json(updatedPaypack);
  };

  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const paypack: Paypack | undefined = await this.repo.one(id, query);
    return res.json(paypack);
  };

  findBy = async (req: Request, res: Response): Promise<Response> => {
    const paypacks: Array<Paypack> | undefined = await this.repo.all({});
    return res.json(paypacks);
  };

}

export default new PaypackApi(new PaypackRepository());
export { PaypackApi };
