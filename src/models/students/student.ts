import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BeforeCreate,
  BeforeSave,
  DefaultScope,
} from "sequelize-typescript";
import {
  Model,
  Role,
  Category,
  Department,
  Person,
  Enrollment,
} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

import { v4 as uuidv4 } from "uuid";
@DefaultScope(() => ({
 // include: [Person, Enrollment]
}))
@Table({
  timestamps: true,
  tableName: "Students",
})
export default class Student extends Model {
  @Column({
    type: DataType.STRING,
  })
  code?: string;

  @Column({
    type: DataType.STRING,
  })
  entryCode!: string;

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

  @Column({
    type: DataType.STRING,
  })
  descriptions?: string

  @Column({
    type: DataType.VIRTUAL,
  })
  get current() {
    if (this.enrollments)
      return this.enrollments.sort((x: any, y: any) => x.createdAt < y.createdAt ? 1 : -1)[0]

    return;
  }

  @BelongsTo(() => Student)
  student!: Student;

  @ForeignKey(() => Student)
  studentId!: string;

  @HasMany(() => Enrollment)
  enrollments?: Enrollment[]

  @BeforeCreate
  @BeforeSave
  static initModel = async (student: Student) => {

    let xcode = await SequenceApp.count(CODES.ENROLLMENT);
    student.code = String(xcode).padStart(6, '0');

    let code = await SequenceApp.count(CODES.STUDENT);
    student.entryCode = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(8, '0');

  };
}
