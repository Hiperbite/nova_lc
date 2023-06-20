import { createIndexDecorator, Sequelize, Table } from "sequelize-typescript";

import Model from "./model";
import User from "./common/user";
import Token from "./common/token";
import Session from "./common/session";
import Address from "./common/address";
import Contact from "./common/contact";
import Student from "./students/student";
import Attachment from "./common/attachment";
import dotenv from "dotenv";
import Role from "./students/role";
import Sequence from "./common/sequence";
import Document from "./document/document";
import Person from "./common/person";
import Period from "./academic/academic-period";
import ClasseRoom from "./academic/classe-room";
import Classe from "./academic/classe";
import Enrollment from "./students/enrollment";
import Track from "./common/track";
import Course from "./academic/course";
import CurricularPlan from "./academic/curricular-plan";
import Discipline from "./academic/discipline";
import Semester from "./academic/semestre";
import PlanItem from "./academic/plansItem";
import TimeTable from "./academic/time-table";
import Staff from "./staff/staff";
import StaffClasse from "./staff/staffClass";
import StaffDiscipline from "./staff/staff-discipline";
import AssessmentType from "./progress/assessment-type";
import Assessment from "./progress/assessment";
import Category from "./staff/category";
import Career from "./staff/career";
import AcademicDegree from "./staff/academic-degree";
import Notification from "./common/notification";
import Ticket from "./help-desk/ticket";
import TicketState from "./help-desk/ticket-state";
import TicketType from "./help-desk/ticket-type";
import Event from "./event/event";
import EventType from "./event/event-type";
import EventSchedule from "./event/event-schedule";
import LocalSetting from "./Settings/local.settings";
import SystemSetting from "./Settings/system.settings";
import ClasseSetting from "./Settings/classe.settings";
import DocumentSetting from "./Settings/document.settings";
import Setting from "./Settings/Settings";

import { v4 as uuid } from "uuid";
import { logger } from "../config";
import LicenseSetting from "./Settings/license.settings";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: "mariadb",
  //dialect: "sqlite",
  storage: "./database.sqlite",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: (msg: any) => logger.info(msg),
  models: [
    Contact,
    User,
    Token,
    Session,
    Student,
    Track,
    Address,
    Attachment,
    Role,

    Sequence,
    Person,
    Document,
    Period,
    ClasseRoom,
    Classe,
    Enrollment,
    TimeTable,
    Course,
    CurricularPlan,
    Discipline,
    Semester,
    PlanItem,

    Staff,
    StaffClasse,
    Category,
    Career,
    StaffDiscipline,
    AcademicDegree,

    AssessmentType,
    Assessment,

    Notification,

    Ticket,
    TicketState,
    TicketType,
    Event,
    EventType,
    EventSchedule,

    LocalSetting,
    SystemSetting,
    ClasseSetting,
    DocumentSetting,
    LicenseSetting,
    Setting,
  ],
});

const UniqIndex = createIndexDecorator({
  name: uuid() + '-index',
  type: 'UNIQUE',
  unique: true,
});

const initialData = [{
  model: EventType, data: [
    { code: 'Matricula', name: 'Matricula' },
    { code: 'ConfirmacaoMatricula', name: 'Confirmação de Matricula' },
    { code: 'Inscricao', name: 'Inscrição' },
  ]
}, {
  model: Event, data: [
    { code: 'EVT00000013', isActive: false, name: 'Inscrição de Novos Estudantes' },
    { code: 'EVT00000012', isActive: false, name: 'Matricula de Novos Inscritos' },
    { code: 'EVT00000011', isActive: false, name: 'Inscrição de novos alunos' },
  ]
}, {
  model: TicketType, data: [
    { code: '9', descriptions: 'Cartão de Estudantes' },
    { code: '8', descriptions: 'Declaração com Notas' },
    { code: '7', descriptions: 'Declaração sem Notas' },
    { code: '6', descriptions: 'Histórico de Estudantes' },
  ]
}, {
  model: TicketState, data: [
    { code: 'Opened', descriptions: 'Aberto' },
    { code: 'Aproved', descriptions: 'Aprovado' },
    { code: 'Done', descriptions: 'Resolvido' },
    { code: 'Rejected', descriptions: 'Rejeitado' },
  ]
}, {
  model: Setting, data: [
    {
      code: 'NOVA',

      system: SystemSetting.create({}),

      documents: DocumentSetting.create({}),

      local: LocalSetting.create({}),

      classe: ClasseSetting.create({}),

      license: LicenseSetting.create({})
    },

  ]
}]
const Repo = sequelize.getRepository;
sequelize.sync({ alter: true, force: false }).then(() =>
  initialData.forEach(({ model, data }: any) => data.forEach(async (d: any) =>
    model.findOne({ where: { code: d.code } }).then((f: any) => f
      ? null
      : model.create(d, { include: { all: true } }).catch(console.log))
  ))
)

enum SPs {
  GetStudentsCountOlder = 'GetStudentsCountOlder',
  GetStudentsCountAge = 'GetStudentsCountAge',
  GetStudentsCountNationality = 'GetStudentsCountNationality',
  GetStudentsCountMaritalStatus = 'GetStudentsCountMaritalStatus',
  GetStudentsCountGender = 'GetStudentsCountGender',
  GetStudentsRegistered = 'GetStudentsRegistered',
  GetStudentHonorRoll = 'GetStudentHonorRoll',
  GetStudentCount = 'GetStudentCount'
}
const Procedure = async (procedure: SPs, opts: any = {}) =>
  await sequelize
    .query('CALL ' + procedure, {})

export default sequelize;

export {
  sequelize,
  Repo,
  Track,
  Model,
  Contact,
  User,
  Token,
  Session,
  Student,
  Address,
  Attachment,
  Role,
  Sequence,
  Document,
  Person,
  Period,
  ClasseRoom,
  Classe,
  Enrollment,
  TimeTable,
  Course,
  CurricularPlan,
  Discipline,
  Semester,
  PlanItem,

  Staff,
  StaffClasse,
  Category,
  Career,
  StaffDiscipline,
  AcademicDegree,

  AssessmentType,
  Assessment,

  Notification,
  Procedure,
  SPs,

  Ticket,
  TicketState,
  TicketType,
  EventSchedule,
  Event,
  EventType,

  UniqIndex,

  LocalSetting,
  SystemSetting,
  ClasseSetting,
  DocumentSetting,
  LicenseSetting,
  Setting,
};
