import { Assessment, Enrollment, Person, Staff, Student, Track, User } from "../../models/index";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import sendEmail, { mailServices } from "../mailler/index";
import { Op } from "sequelize";

export type HistoryEventType =
  "created" |
  "registered" |
  "updated" |
  "deleted" |
  "upgared" |
  "downgraded";
export type HistoryEventState =
  "primary" |
  "secondary" |
  "success" |
  "danger" |
  "warning" |
  "info" |
  "light" |
  "dark"
  ;
export type HistoryType = {
  no: number,
  date: Date,
  type: HistoryEventType,
  descriptions: string,
  state: HistoryEventState,
  body?: any,
  user?: User
}
export class UserApp {

  static hashPassword = async (user: User) => {

    if ((user.changed() || []).filter(x => x === 'password').length === 0)
      return;

    const saltRounds = 10;
    try {
      // Generate a salt
      user.salt = await bcrypt.genSalt(saltRounds);

      // Hash password
      user.password = await bcrypt.hash(user.password ?? "", user.salt);

      console.log(user.password);
    } catch (error) {
      console.log(error);
    }
  };

  static sendMail = async (user: User) =>
    null;
  static createUser = async (user: User) =>
    sendEmail(
      {
        service: mailServices.createUser,
        data: user
      })

  static initVer = async (user: User) => {
    user.verificationCode = uuid().substring(5, 12).toUpperCase();
    user.verified = true;
  };


  static history = async (user: User): Promise<HistoryType[]> => {
    const histories: HistoryType[] = [];
    const student = await Student.findOne({ where: { personId: user.personId }, include: [Enrollment.scope('withClassAndAssessment')] })
    let no = 0;
    let refersTrack: any[] = [];
    if (student) {
      histories.push(
        {
          no: no++,
          date: student.createdAt,
          type: 'created',
          descriptions: 'Estudante registado',
          body: student,
          state: 'success'
        })
      refersTrack.push({ model: 'Student', id: student?.id });
      student.enrollments?.map((enrollment: Enrollment) => {
        histories.push(
          {
            no: no++,
            date: enrollment.createdAt,
            type: 'created',
            descriptions: 'Matriculado na Turma ' + enrollment?.classe?.code,
            body: enrollment,
            state: 'success'
          })
        refersTrack.push({ model: 'Enrollment', id: enrollment?.id });
        enrollment?.assessments?.forEach((assessment: Assessment) => {
          histories.push(
            {
              no: no++,
              date: assessment.createdAt,
              type: 'created',
              descriptions: `Foi registada a nota do ${assessment?.type?.name} de ${assessment?.discipline?.name} do ${assessment?.semester}º semestre (${assessment?.value})`,
              body: enrollment,
              state: 'success'
            })

          refersTrack.push({ model: 'Assessment', id: assessment?.id });
        });
      })
    } else {
      const staff = await Staff.findOne({ where: { personId: user.personId } })
      if (staff) {
        histories.push(
          {
            no: no++,
            date: staff.createdAt,
            type: 'created',
            descriptions: 'Registado',
            body: staff,
            state: 'success'
          })

        refersTrack.push({ model: 'Staff', id: staff?.id });
      }
    }

    const where = { [Op.or]: refersTrack.map(({ model, id: ref }: any) => ({ [Op.and]: { model, ref } })) }
    const traks = await Track.findAll({ where });
    traks.forEach((track: Track) => {
      histories.push(
        {
          no: no++,
          date: track.createdAt,
          type: 'created',
          descriptions: `Foi alterado dados de ${track?.model}`,
          body: track,
          state: 'success'
        })
    })

    return histories.sort((a:any, b:any) =>  Date.parse(a.date) - Date.parse(b.date) ? -1 : 1)
  }

}
