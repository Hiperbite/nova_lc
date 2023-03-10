import sendEmail from "../../application/mailler/mailler";
import { Contact, TransactionType, User } from "../../models/index";
import { UserRepository } from "../index";
import IRepository from "../irepository";
import Repository, { Paginate } from "../repository";

class TransactionTypeRepository
  extends Repository<TransactionType>
  implements IRepository<TransactionType>
{
  /*oneBy(query: any): Promise<TransactionType | undefined> {
    throw new Error("Method not implemented.");
  }*/

  constructor() {
    super(TransactionType);
  }
  oneBy(query: any): Promise<TransactionType | undefined> {
    throw new Error("Method not implemented.");
  }

  private defaultOptions = async () => ({
    attributes: Object.keys(await TransactionType.describe()),
    include: [TransactionType],
  });

  one = async (
    id: string,
    { attributes }: any = {}
  ): Promise<TransactionType | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const transactionType: TransactionType | undefined = await this.findOne(
      id,
      options
    );
    return transactionType;
  };

  create = async (data: any): Promise<TransactionType | undefined> => {
    const transactionType = await this.createOne(data);

    return transactionType;
  };

  update = async (data: any): Promise<TransactionType | undefined> => {
    return await this.updateOne(data);
    //  return await this.findOne(id);
  };

  delete = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };

  all = async ({ attributes = {} }: any = {}): Promise<
    TransactionType[] | undefined
  > => {
    const options = { ...(await this.defaultOptions()), attributes };

    const data: TransactionType[] | undefined = await this.findAll(options);
    return data;
  };

  allBy = async (query: any): Promise<TransactionType[] | undefined> => {
    const { where, attributes } = query;
    const options = { ...(await this.defaultOptions()), attributes, where };

    const data: TransactionType[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<TransactionType | undefined> =>
    await this.first();
  last = async (): Promise<TransactionType | undefined> =>
    await this.last();
  disable = async (data: any): Promise<TransactionType | undefined> =>
    await this.disable(data.id);
  enable = async (data: any): Promise<TransactionType | undefined> =>
    await this.enable(data.id);

  clear = async () => {
    return true;
  };

  paginated = async (
    options: any
  ): Promise<Paginate<TransactionType> | undefined> => this.paginate(TransactionType, options)
}
export default TransactionTypeRepository;
