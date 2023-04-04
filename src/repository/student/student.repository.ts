import { Op } from "sequelize";
import {
  Address,
  Document,
  Contact,
  Person,
  Student,
  User,
  Enrollment,
  Classe,
  Course,
} from "../../models/index";
import { UserRepository } from "../index";
import IRepository from "../iRepository";
import Repository, { Paginate } from "../repository";

export default class StudentRepository
  extends Repository<Student>
  implements IRepository<Student>
{
  constructor() {
    super(Student);
  }
  //protected t: any;

  private defaultOptions = async () => ({
    attributes: Object.keys(await Student.describe()),
    include: [Course,
      { model: Enrollment, include: [Classe] },
      {
        model: Person,
        include: [
          Contact,
          Document,
          { model: User, as: "user" },
          { model: Address, as: "birthPlaceAddress" },
          { model: Address, as: "livingAddress" },
        ],
      },
    ],
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

    const options = { ...(await this.defaultOptions()) };
    const student: Student | undefined = await this.findOneBy(query);
    return student;
  }

  create = async (data: any): Promise<Student | undefined> => {
    await this.startTransaction();
    const options = await this.defaultOptions();

    const student = await this.createOne(data, options);

    return student;
  };

  update = async (data: any): Promise<Student | undefined> => {
    const options = await this.defaultOptions();
    return await this.updateOne(data, options);
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
  enable = async (data: any): Promise<Student | undefined> =>
    await this.enableBy(data.id);

  delete = (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  paginated = async (options: any): Promise<Paginate<Student> | undefined> => {

    let { filter, where } = options
    if (filter && filter === "withEnrollment") {
      where = {
        ...where, ... {
          [Op.and]: [{
            code: {
              [Op.not]: null
            }
          }]
        }
      }
    } else
      if (filter && filter === "withNotEnrollment") {
        where = {
          ...where, ... {
            [Op.and]: [{
              code:  {
                [Op.eq]: null
              }
            }]
          }
        }
      }
    const students = await this.paginate(Student, { include: [Person, { model: Enrollment, include: [Classe] }], ...options, ...{ where } });

    return students
  }
}

//export default StudentRepository;
