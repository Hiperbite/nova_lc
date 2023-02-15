import sendEmail from "../../application/mailler";
import sequelize, { Contact, Employee, User } from "../../models/index";
import { UserRepository } from "../index";
import IRepository from "../irepository";
import Repository from "../repository";
import contactRepository from "./contact.repository";
import PersonRepository from "./person.repository";

export default class EmployeeRepository
  extends Repository<Employee>
  implements IRepository<Employee>
{

  constructor() { super(Employee); }
  //protected t: any;
  

  private defaultOptions = async () => ({
    attributes: Object.keys(await Employee.describe()),
    include: [Contact, User],
  });

  one = async (
    id: string,
    { attributes }: any = {}
  ): Promise<Employee | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const employee: Employee | undefined = await this.findOne(id, options);
    return employee;
  };
  oneBy = (query: any): Promise<Employee | undefined> => {
    throw new Error("Method not implemented.");
  }

  create = async (data: any): Promise<Employee | undefined> => {
    await this.startTransaction()
try{
    const employee = await this.createOne(data, this.t);

    const newContacts = data?.person?.contacts
    if (employee.person === undefined) {
      const newPeron = { ...data.person, ...{ employeeId: employee.id } }

      delete data?.person?.contacts
      const person = await PersonRepository.create(data.person, this.t);
      employee.update({ personId: person?.id })

      if (employee?.id !== undefined) {
        const contacts = newContacts?.map(
          async (contact: any) =>
            await contactRepository.create({
              ...contact,
              ...{ personId: person?.id },
            }, this.t)
        );
      }

      if (employee.user === undefined) {
        const user = await UserRepository.create({
          password: null,
          username: `${employee.person.firstName.toLowerCase()}.${employee.person.lastName.toLowerCase()}`,
          employeeId: employee.id,
          email: data?.contacts[0].descriptions,
          role: "ROLE_USER",
        }, this.t);

      }
    }
    this.t.commit();
  }catch(e:any){
    console.log(e);
  }
    return /*employee || */new Employee({});
  };

  update = async (data: any): Promise<Employee | undefined> => {
    return await this.updateOne(data);
    //  return await this.findOne(id);
  };

  deleteOne = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };


  all = async (opts: any = {}): Promise<Employee[] | undefined> => {
    const options = { include: null, attributes: null };

    const data: Employee[] | undefined = await this.findAll(options);
    return data;
  };

  allBy = async (query: any): Promise<Employee[] | undefined> => {
    const where = query;
    const options = { include: null, attributes: {}, where };

    const data: Employee[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<Employee | undefined> => await this.first();
  last = async (): Promise<Employee | undefined> => await this.last();
  disable = async (data: any): Promise<Employee | undefined> =>
    await this.disableBy(data.id);
  enable = async (data: any): Promise<Employee | undefined> => await this.enableBy(data.id);

  delete = (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  }
}

//export default EmployeeRepository;
