import { Request, Response } from "express";
import { Op } from "sequelize";
import { Staff, Person, } from "../../models/index";
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

  create = async (req: Request, res: Response): Promise<Response | any> => {
    const { body } = req;

    const staff: Staff | void = await this.repo.create(body);
    return res.json(staff);
  };
  update = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const { body } = req;

    const staff = await this.repo.update({ ...body, id });

    const updatedStaff = await this.repo.one(id);

    await updatedStaff?.update(body, { returning: true });

    return res.json(updatedStaff);
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
    const { q } = req.query
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
