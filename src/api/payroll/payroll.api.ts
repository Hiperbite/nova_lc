import { Request, Response } from "express";
import { Payroll, Contact } from "../../models/index";
import { PayrollRepository, Repository } from "../../repository";
import IRepository from "../../repository/irepository";
interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}

class PayrollApi {
  constructor(private repo: IRepository<Payroll>) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    const payroll: Payroll | void = await this.repo.create(body);

    return res.json(payroll);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    
    const { id } = req.params;

    const { body } = req;

    const payroll = await this.repo.update({ ...body, id });

    const updatedPayroll = await this.repo.one(id);

    await updatedPayroll?.update(body, { returning: true });

    return res.json(updatedPayroll);
  };

  find = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { query } = req;

    const payroll: Payroll | undefined = await this.repo.one(id, query);
    return res.json(payroll);
  };

  findBy = async (req: Request, res: Response): Promise<Response> => {
    const payrolls: Array<Payroll> | undefined = await this.repo.all({});
    return res.json(payrolls);
  };

}

export default new PayrollApi(new PayrollRepository());
export { PayrollApi };
