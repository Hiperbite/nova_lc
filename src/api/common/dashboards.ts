import { Request, Response } from "express";
import { Procedure, SPs, Track, } from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";
import IRepository from "../../repository/iRepository";

class DashBoardApi {
  constructor(private repo: IRepository<any>) { };

  common = async (req: Request, res: Response): Promise<Response> => {
    const studentsCount = {
      age: await Procedure(SPs.GetStudentsCountAge)
      , gender: await Procedure(SPs.GetStudentsCountGender)
      , maritalStatus: await Procedure(SPs.GetStudentsCountMaritalStatus)
      , nationality: await Procedure(SPs.GetStudentsCountNationality)
      , older: await Procedure(SPs.GetStudentsCountOlder)
    };

    return res.json({ studentsCount });
  };
  registered = async (req: Request, res: Response): Promise<Response> => {
    const registered = {
      students: await Procedure(SPs.GetStudentsRegistered)

    };

    return res.json({ registered });
  };
}

export default new DashBoardApi(new Repository(Track));
export { DashBoardApi };