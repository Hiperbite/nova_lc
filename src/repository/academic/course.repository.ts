import { Op } from "sequelize";
import  {
  Address,
  Document,
  Contact,
  Person,
  Course,
  User,
  Enrollment,
  Classe,
} from "../../models/index";
import { UserRepository } from "../index";
import IRepository from "../iRepository";
import Repository, { Paginate } from "../repository";

export default class CourseRepository
  extends Repository<Course>
  implements IRepository<Course>
{
  constructor() {
    super(Course);
  }
  //protected t: any;

  private defaultOptions = async () => ({
    attributes: Object.keys(await Course.describe()),
    include: [
      { model: Enrollment, include: [] },
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
  ): Promise<Course | undefined> => {
    const options = { ...(await this.defaultOptions()), attributes };
    const course: Course | undefined = await this.findOne(id, options);

    return course;
  };
  oneBy = async (query: any,opts?:any): Promise<Course | undefined> => {

    const options = { ...(await this.defaultOptions()) };
    const course: Course | undefined = await this.findOneBy(query);
    if(opts.withStudents){
    //  const students = await       
    }
    return course;
  }

  create = async (data: any): Promise<Course | undefined> => {
    await this.startTransaction();
    const options = await this.defaultOptions();

    data.person.user = {
      password: null,
      username: `${data.person.firstName.toLowerCase()}.${data.person.lastName.toLowerCase()}`,
      email: data.person?.contacts[0].descriptions,
      role: "ROLE_USER",
    };
    const course = await this.createOne(data, options);

    return course;
  };

  update = async (data: any): Promise<Course | undefined> => {
    const options = await this.defaultOptions();
    return await this.updateOne(data, options);
    //  return await this.findOne(id);
  };

  deleteOne = async (data: any): Promise<boolean> => {
    return await this.deleteBy(data.id);
  };

  all = async (opts: any = {}): Promise<Course[] | undefined> => {
    const options = { include: [Person], attributes: null, ...opts };

    const data: Course[] | undefined = await this.findAllBy(options);
    return data;
  };

  allBy = async (query: any): Promise<Course[] | undefined> => {
    const where = query;
    const options = { include: [Person], attributes: {}, where };

    const data: Course[] | undefined = await this.findAll({});
    return data;
  };

  first = async (): Promise<Course | undefined> => await this.first();
  last = async (): Promise<Course | undefined> => await this.last();
  disable = async (data: any): Promise<Course | undefined> =>
    await this.disableBy(data.id);
  enable = async (data: any): Promise<Course | undefined> =>
    await this.enableBy(data.id);

  delete = (data: any): Promise<any> => {
    throw new Error("Method not implemented.");
  };

  paginated = async (options: any): Promise<Paginate<Course> | undefined> => {

    let { filter, where } = options
    if (filter && filter === "withNotEnrollment") {
      where = {
        ...where, ... {
          [Op.and]: [{
            ['$enrollment.id$']: {
              [Op.eq]: null
            }
          }]
        }
      }
    } else
      if (filter && filter === "withEnrollment") {
        where = {
          ...where, ... {
            [Op.and]: [{
              ['$enrollment.id$']: {
                [Op.ne]: null
              }
            }]
          }
        }
      }
    const courses = await this.paginate(Course, { ...options, ...{ where } });
   
    return courses
  }
}

//export default CourseRepository;
