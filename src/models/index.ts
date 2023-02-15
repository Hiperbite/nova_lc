import { Sequelize, Table } from "sequelize-typescript";

import Model from "./model";
import User from "./common/user";
import Token from "./common/token";
import Session from "./common/session";

import Address from "./employee/address";
import Contact from "./employee/contact";
import Employee from "./employee/employee";
import Attachment from "./employee/attachment";

import dotenv from "dotenv";
import Role from "./employee/role";
import Category from "./employee/category";
import Department from "./employee/department";

import Payroll from "./payroll/payroll";
import Transaction from "./payroll/transaction";
import TransactionType from "./payroll/transactionType";

import Paypack from "./payroll/paypack";
import Sequence from "./common/sequence";
import Document from "./document/document";
import Person from "./employee/person";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: "mariadb",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: true,
  models: [Contact, User, Token, Session, Employee,
    Address, Attachment, Role, Category, Department,
    Payroll, Transaction, TransactionType, Paypack, Sequence,Person, Document, ]
});

const Repo = sequelize.getRepository;
sequelize.sync({ alter: true, force: true })

export default sequelize;

export {
  sequelize,
  Repo,
  Model,Contact, User, Token, Session, Employee,
  Address, Attachment, Role, Category, Department,
  Payroll, Transaction, TransactionType, Paypack, Sequence, Document, Person
};
