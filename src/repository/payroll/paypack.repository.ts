import { Paypack, TransactionType, User } from "../../models/index";
import IRepository from "../irepository";
import Repository, { Paginate } from "../repository";

class PaypackRepository
  extends Repository<Paypack>
  implements IRepository<Paypack>
{
  /*oneBy(query: any): Promise<Paypack | undefined> {
    throw new Error("Method not implemented.");
  }*/

  constructor() {
    super(Paypack);
  }
  oneBy(query: any): Promise<Paypack | undefined> {
    throw new Error("Method not implemented.");
  }

  private defaultOptions = async () => ({
    attributes: Object.keys(await Paypack.describe()),
    //include: [{model:,attributes:['code','firstName','lastName','birthDate','roleId']}, TransactionType],
  });

  one = async (
    id: string,
    { attributes }: any = {}
  ): Promise<Paypack | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const paypack: Paypack | undefined = await this.findOne(
      id,
      options
    );
    return paypack;
  };

  create = async (data: any): Promise<Paypack | undefined> => {
    const paypack = await this.createOne(data);

    return paypack;
  };

  update = async (data: any): Promise<Paypack | undefined> => {
    return await this.updateOne(data);
    //  return await this.findOne(id);
  };

  delete = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };

  all = async ({ attributes = {} }: any = {}): Promise<
    Paypack[] | undefined
  > => {
    const options = { ...(await this.defaultOptions()), attributes };

    const data: Paypack[] | undefined = await this.findAll(options);
    return data;
  };

  allBy = async (query: any): Promise<Paypack[] | undefined> => {
    const { where, attributes } = query;
    const options = { ...(await this.defaultOptions()), attributes, where };

    const data: Paypack[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<Paypack | undefined> =>
    await this.first();
  last = async (): Promise<Paypack | undefined> =>
    await this.last();
  disable = async (data: any): Promise<Paypack | undefined> =>
    await this.disable(data.id);
  enable = async (data: any): Promise<Paypack | undefined> =>
    await this.enable(data.id);

  clear = async () => {
    return true;
  };
  paginated = async (
    options: any
  ): Promise<Paginate<Paypack> | undefined> => this.paginate(Paypack, options)
}
export default PaypackRepository;
