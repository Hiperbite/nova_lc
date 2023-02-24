import sendEmail from "../../application/mailler";
import sequelize, { Address, Document, Contact, Person, Student, User, Enrollment } from "../../models/index";
import { UserRepository } from "../index";
import IRepository from "../irepository";
import Repository, { Paginate } from "../repository";
import contactRepository from "./contact.repository";
import PersonRepository from "./person.repository";

export default class StudentRepository
  extends Repository<Student>
  implements IRepository<Student>
{

  constructor() { super(Student); }
  //protected t: any;


  private defaultOptions = async () => ({
    attributes: Object.keys(await Student.describe()),
    include: [
      Enrollment,
      {
        model: Person, include: [
          Contact,
          Document,
          User,
          { model: Address, as: 'birthPlaceAddres' },
          {
            model: Address, as: 'livingAddres'
          }]
      }]
  });

  one = async (
    id: string,
    { attributes }: any = {}
  ): Promise<Student | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const student: Student | undefined = await this.findOne(id, options);
    return student;
  };
  oneBy = async (query: any): Promise<Student | undefined> => {
   
    const options = { ...(await this.defaultOptions())};
    const student: Student | undefined = await this.findOneBy(query);
    return student;
  }

  create = async (data: any): Promise<Student | undefined> => {
    await this.startTransaction()
    try {
      const options = await this.defaultOptions();

      data.person.user = {
        password: null,
        username: `${data.person.firstName.toLowerCase()}.${data.person.lastName.toLowerCase()}`,
        email: data.person?.contacts[0].descriptions,
        role: "ROLE_USER",
      }
      const student = await this.createOne(data, options);

      return student;
    } catch (e: any) {
     return  e;
    }
    return undefined;
  };

  update = async (data: any): Promise<Student | undefined> => {
    return await this.updateOne(data);
    //  return await this.findOne(id);
  };

  deleteOne = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };


  all = async (opts: any = {}): Promise<Student[] | undefined> => {
    const options = { include: [Person], attributes: null, ...opts };

    const data: Student[] | undefined = await this.findAllBy(options);
    return data;
  };

  allBy = async (query: any): Promise<Student[] | undefined> => {
    const where = query;
    const options = { include: [Person], attributes: {}, where };

    const data: Student[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<Student | undefined> => await this.first();
  last = async (): Promise<Student | undefined> => await this.last();
  disable = async (data: any): Promise<Student | undefined> =>
    await this.disableBy(data.id);
  enable = async (data: any): Promise<Student | undefined> => await this.enableBy(data.id);

  delete = (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  }

  paginated = async (
    options: any
  ): Promise<Paginate<Student> | undefined> => this.paginate(Student, {...options,include: [Person]})
}

//export default StudentRepository;
