import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
    HasMany,
    DefaultScope
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { EnrollmentConfirmation, Model, Student, User } from "../index";

@DefaultScope(() => ({
    //include: [EnrollmentConfirmation]
  }))
@Table({
    timestamps: true,
    tableName: "Registrations",
})
export default class Enrollment extends Model {

    @Column({
        type: DataType.STRING,
        //     allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @Column({
        type: DataType.VIRTUAL,
    })
    get current() {
        if (this.enrollmentConfirmations)
            return this.enrollmentConfirmations[this.enrollmentConfirmations?.length - 1]
            
        return;
    }

    @BelongsTo(() => Student)
    student!: Student;

    @ForeignKey(() => Student)
    studentId!: string;

    @HasMany(() => EnrollmentConfirmation)
    enrollmentConfirmations?: EnrollmentConfirmation[]

    @BeforeCreate
    @BeforeSave
    static initModel = async (student: Student) => {
        let code = await SequenceApp.count(CODES.ENROLLMENT);
        student.code = String(code).padStart(6, '0');
    };
}