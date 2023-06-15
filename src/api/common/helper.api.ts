import { EnrollmentApp } from './../../application/student/enrollment.app';
import { Request, Response } from "express";
import { AssessmentApp } from "../../application/student/assessment.app";
import IRepository from "../../repository/iRepository";
import { Paginate } from "../../repository/repository";
import PdfService from '../../service/pdf.service';
import { EventType, Student } from '../../models/index';
import { StudentRepository } from '../../repository/index';
import { canCreateEnrollment } from '../../application/business';

const fs = require('fs');

interface IApi {
  create(req: Request, res: Response): Response;
  update(req: Request, res: Response): Response;
  find(req: Request, res: Response): Response;
  findBy(req: Request, res: Response): Response;
}
class HelperApi {
  constructor() { };

  fileDownload = async (req: Request, res: Response): Promise<Response> => {

    const student = await (new StudentRepository()).one('01ea3b12-a444-46a6-bb58-763fa0eeb48a');
    const directoryPath = await (new PdfService()).generate(student);

    res.download(directoryPath, (err: any) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
      fs.unlinkSync(directoryPath)
    })
    return res;
  };

  permissions = async (req: Request, res: Response): Promise<Response> => {

    let can: any = {}

    const { permissions }: any = req.query?.where
    for (let p in permissions)
      switch (permissions[p]) {
        case 'canCreateEnrollment':
          can.canCreateEnrollment = await canCreateEnrollment(EventType.Matricula);
          break;
        case 'canCreateStudent':
          can.canCreateStudent = await canCreateEnrollment(EventType.Inscricao);
          break;
        case 'canReCreateEnrollment':
          can.canReCreateEnrollment = await canCreateEnrollment(EventType.ConfirmacaoMatricula);
          break;
      }



    res.send(can);
    return res;
  }
}

export default new HelperApi();
export { HelperApi };