import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BeforeCreate,
  BeforeSave,
  HasOne,
  AfterCreate,
  AfterSave,
} from "sequelize-typescript";
import {
  Contact,
  Model,
  Address,
  Role,
  Category,
  Department,
  Attachment,
  Payroll,
  Paypack,
  User,
  Person,
  Enrollment,
} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

import { v4 as uuidv4 } from "uuid";

export type MaritalstatusType =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "OTHER";
export type GenderType =
  | "M"
  | "F";

@Table({
  timestamps: true,
  tableName: "Students",
})
export default class Student extends Model {
  @Column({
    type: DataType.STRING,
    //     allowNull: false,
  })
  code!: string;

  @ForeignKey(() => Person)
  personId?: string;

  @BelongsTo(() => Person)
  person?: Person;

  @ForeignKey(() => Role)
  roleId?: string;

  @BelongsTo(() => Role)
  role?: Role;

  @ForeignKey(() => Category)
  categoryId?: string;

  @BelongsTo(() => Category)
  category?: Category;

  @ForeignKey(() => Department)
  departmentId?: string;

  @BelongsTo(() => Department)
  department?: Department;
    
  @HasOne(()=>Enrollment)
  enrollment?:Enrollment;

  @BeforeCreate
  @BeforeSave
  static initModel = async (student: Student) => {
    let code = await SequenceApp.count(CODES.STUDENT);
    student.code = uuidv4().substring(5, 9).toUpperCase()+String(code).padStart(8, '0');
  };
}