import { Request, Response } from "express";
import { Op } from "sequelize";
import { Staff, Person, Discipline, StaffDiscipline, } from "../../models/index";
import { StaffRepository } from "../../repository/index";
import IRepository from "../../repository/irepository";
import { Paginate } from "../../repository/repository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class StaffApi {
  constructor(private repo: IRepository<Staff>) { }
  updateModel = (model: any) => this.repo
  create = async (req: Request, res: Response): Promise<Response | any> => {
    const { body } = req;

    const staff: Staff | void = await this.repo.create(body);
    return res.json(staff);
  };
  update = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { body } = req;

    const staff = await this.repo.one(id);

    const staffId = staff?.id;

    await staff?.update(body, { returning: true });

    if (body?.disciplines && staff) {
      const disciplines: Discipline[] = await Discipline.findAll({ where: { id: body?.disciplines?.add } })
      disciplines.forEach(async (discipline: Discipline) => {
        try {

          const d = await StaffDiscipline.create({ staffId, disciplineId: discipline?.id })
          let y = 0;

        } catch (error: any) {
          let u = error
        }
      })
    }
    return res.json(staff);
  };
  find = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { query } = req;

    const staff: Staff | undefined = await this.repo.one(id, query);
    if (!staff) {
      throw { message: "User not found", code: 404 };
    }
    return res.json(staff);
  };
  findBy = async (req: Request, res: Response): Promise<Response | void> => {
    const { q, scope } = req.query
    if (q) {
      try {

        const staffs: any | Paginate<Staff> | undefined = await this.repo.all(
          {
            subQuery: false,
            where: {
              [Op.or]: [
                { ['$person.lastName$']: { [Op.like]: `%${q}%` } },

                { ['$person.firstName$']: { [Op.like]: `%${q}%` } },
                { ['$code$']: { [Op.like]: `%${q}%` } }
              ]
            },
            include: [Person],
            order: [[Person, "firstName", "ASC"]],
            offset: 0,
            limit: 10,
          }
        );
        return res.json(staffs);

      } catch (error) {
        const xxx = error
      }
    } else if (scope) {
      const { where }: any = req.query;


      const staffs: Paginate<Staff> | undefined = await this.repo.paginated(
        { ...req.query, where }
      );

      return res.json(staffs);
    } else {
      const staffs: Paginate<Staff> | undefined = await this.repo.paginated(
        req.query
      );

      return res.json(staffs);
    }
  };
}

export default new StaffApi(new StaffRepository());
export { StaffApi };
