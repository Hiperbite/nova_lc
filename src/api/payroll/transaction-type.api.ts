import { Request, Response } from "express";
import { Repository } from "sequelize-typescript";
import { TransactionType, Contact } from "../../models/index";
import { TransactionTypeRepository } from "../../repository";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class TransactionTypeApi {
  constructor(private repo: IRepository<TransactionType>) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const transactionType: TransactionType | void = await this.repo.create(
      body
    );

    return res.json(transactionType);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { body } = req;

    const transactionType = await this.repo.update({ ...body, id });

    const updatedTransactionType = await this.repo.one(id);

    await updatedTransactionType?.update(body, { returning: true });

    return res.json(updatedTransactionType);
  };

  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const transactionType: TransactionType | undefined = await this.repo.one(
      id,
      query
    );
    return res.json(transactionType);
  };

  findBy = async (req: Request, res: Response): Promise<Response> => {
    const transactionTypes: Array<TransactionType> | undefined =
      await this.repo.all({});
    return res.json(transactionTypes);
  };
}

export default new TransactionTypeApi(new TransactionTypeRepository());
export { TransactionTypeApi };
