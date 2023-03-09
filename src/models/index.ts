import { Sequelize, Table } from "sequelize-typescript";

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
import Category from "./students/category";
import Department from "./students/department";

import Payroll from "./payroll/payroll";
import Transaction from "./payroll/transaction";
import TransactionType from "./payroll/transactionType";

import Paypack from "./payroll/paypack";
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
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: "mariadb",
  //  dialect: "sqlite",
  storage: "./database.sqlite",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
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
    Category,
    Department,
    Payroll,
    Transaction,
    TransactionType,
    Paypack,
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

    StaffDiscipline,
  ],
});

const Repo = sequelize.getRepository;
//sequelize.sync({ alter: true, force: false })

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
  Category,
  Department,
  Payroll,
  Transaction,
  TransactionType,
  Paypack,
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

  StaffDiscipline,
};
