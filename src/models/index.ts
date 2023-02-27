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
import AcademicPeriod from "./academic/academic-period";
import AcademicShift from "./academic/academic-shift";
import ClassyRoom from "./academic/classy-room";
import Classy from "./academic/classy";
import EnrollmentConfirmation from "./students/enrollment-confirmation";
import Enrollment from "./students/enrollment";
import Track from "./common/track";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: "mariadb",
  //dialect: 'sqlite',
  storage: './database.sqlite',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  models: [Contact, User, Token, Session, Student, Track,
    Address, Attachment, Role, Category, Department,
    Payroll, Transaction, TransactionType, Paypack, Sequence,Person, Document, 
  AcademicPeriod, AcademicShift, ClassyRoom, Classy, EnrollmentConfirmation, Enrollment
  ]
});

const Repo = sequelize.getRepository;
//sequelize.sync({ alter: true, force: false })

export default sequelize;

export {
  sequelize,
  Repo,
  Track,
  Model,Contact, User, Token, Session, Student,
  Address, Attachment, Role, Category, Department,
  Payroll, Transaction, TransactionType, Paypack, Sequence, Document, Person,

  AcademicPeriod, AcademicShift, ClassyRoom, Classy, EnrollmentConfirmation, Enrollment
};
