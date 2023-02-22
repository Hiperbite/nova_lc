import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
    HasMany
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { EnrollmentConfirmation, Model, Student, User } from "../index";

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

    @BelongsTo(() => Student)
    student!: Student;

    @ForeignKey(() => Student)
    studentId!: string;

    @HasMany(()=>EnrollmentConfirmation)
    enrollmentConfirmations?:EnrollmentConfirmation[]
    
    @BeforeCreate
    @BeforeSave
    static initModel = async (student: Student) => {
        let code = await SequenceApp.count(CODES.ENROLLMENT);
        student.code = String(code).padStart(6, '0');
    };
}