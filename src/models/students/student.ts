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
} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

type MaritalstatusType =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "OTHER";

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
  @ForeignKey(() => User)
  userId?: string;

  @HasOne(() => User)
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

  @HasMany(() => Payroll)
  payrolls?: Payroll[];

  @HasMany(() => Paypack)
  paypacks?: Paypack[];

  @BeforeCreate
  @BeforeSave
  static initModel = async (student: Student) => {
    if (student.code === undefined) {
      student.update({ code: await SequenceApp.count(CODES.EMPLOYEE) });
    }
  };
}

export { MaritalstatusType };
