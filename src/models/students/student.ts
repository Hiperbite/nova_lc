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
  AfterCreate,
} from "sequelize-typescript";
import {
  Model,
  Role,
  Category,
  Person,
  Enrollment,
  Course,
} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

import { v4 as uuidv4 } from "uuid";

import sendEmail, { mailServices } from "../../application/mailler/index";
/*{@DefaultScope(() => ({
  // include: [Person, Enrollment]
}))*/
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

  @Column({
    type: DataType.STRING,
  })
  descriptions?: string

  @Column({
    type: DataType.VIRTUAL,
  })
  get enrollment() {
    if (this.enrollments)
      return this.enrollments.sort((x: any, y: any) => x.createdAt < y.createdAt ? 1 : -1)[0]

    return;
  }

  @BelongsTo(() => Student)
  student!: Student;

  @ForeignKey(() => Student)
  studentId!: string;

  @BelongsTo(() => Course)
  desiredCourse!: Course;

  @ForeignKey(() => Course)
  desiredCourseId!: string;

  @HasMany(() => Enrollment)
  enrollments?: Enrollment[]

  @BeforeCreate
  @BeforeSave
  static initModel = async (student: Student) => {

    let code = await SequenceApp.count(CODES.STUDENT);
    student.entryCode = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(8, '0');

  };

  @AfterCreate
  static doAfterCreateStudent = async (student: Student): Promise<void> => {

    sendEmail(
      {
        service: mailServices.createStudent,
        data: { person: student?.person, student, to: student?.person?.user?.email }
      }
    )

  }
}
