import { Op } from "sequelize";

import sendEmail from "../../application/mailler";
import sequelize, {
  Address,
  Document,
  Contact,
  Person,
  Staff,
  User,
  Classe,
} from "../../models/index";

import IRepository from "../irepository";
import Repository, { Paginate } from "../repository";



export default class StaffRepository
  extends Repository<Staff>
  implements IRepository<Staff>
{
  constructor() {
    super(Staff);
  }
  //protected t: any;

  private defaultOptions = async () => ({
    attributes: Object.keys(await Staff.describe()),
    include: [
      {
        model: Person,
        include: [
          Contact,
          Document,

          { model: User, as: "user" },
          { model: Address, as: "birthPlaceAddress" },
          { model: Address, as: "livingAddress"},
        ],
      },
    ],
  });

  one = async (
    id: string,
    { attributes }: any = {}
  ): Promise<Staff | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const staff: Staff | undefined = await this.findOne(id, options);

    return staff;
  };
  oneBy = async (query: any): Promise<Staff | undefined> => {

    const options = { ...(await this.defaultOptions()) };
    const staff: Staff | undefined = await this.findOneBy(query);
    return staff;
  }

  create = async (data: any): Promise<Staff | undefined> => {
    await this.startTransaction();
    const options = await this.defaultOptions();

    data.person.user = {
      password: null,
      username: `${data.person.firstName.toLowerCase()}.${data.person.lastName.toLowerCase()}`,
      email: data.person?.contacts[0].descriptions,
      role: "ROLE_STAFF",
    };
    const staff = await this.createOne(data, options);

    return staff;
  };

  update = async (data: any): Promise<Staff | undefined> => {
    const options = await this.defaultOptions();
    return await this.updateOne(data, options);
    //  return await this.findOne(id);
  };

  deleteOne = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };

  all = async (opts: any = {}): Promise<Staff[] | undefined> => {
    const options = { include: [Person], attributes: null, ...opts };

    const data: Staff[] | undefined = await this.findAllBy(options);
    return data;
  };

  allBy = async (query: any): Promise<Staff[] | undefined> => {
    const where = query;
    const options = { include: [Person], attributes: {}, where };

    const data: Staff[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<Staff | undefined> => await this.first();
  last = async (): Promise<Staff | undefined> => await this.last();
  disable = async (data: any): Promise<Staff | undefined> =>
    await this.disableBy(data.id);
  enable = async (data: any): Promise<Staff | undefined> =>
    await this.enableBy(data.id);

  delete = (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  paginated = async (options: any): Promise<Paginate<Staff> | undefined> => {

    let {  where } = options

    if (where?.roles) {
      const roles =where?.roles
      delete where?.roles
      where = {
        ...where, ... {
          [Op.and]: [{
            roles: {
              [Op.like]: `%${roles}%`
            }
          }]
        }
      }
    } 
    const staffs = await this.paginate(Staff, {  ...options, ...{ where } });
   
    return staffs
  }
}

//export default StaffRepository;
