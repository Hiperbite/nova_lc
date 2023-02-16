import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    BelongsToMany,
    BeforeCreate,
    BeforeSave
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Model, Student, User } from "../index";

@Table({
    timestamps: true,
    tableName: "Registrations",
})
export default class Registration extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;

    @Column({
        type: DataType.STRING,
    })
    desciptions?: string

    @BelongsTo(() => Student)
    student?: Student;

    @ForeignKey(() => Student)
    studentId?: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (student: Student) => {
        let code = await SequenceApp.count(CODES.REGISTRATION);
        student.code = 'E' + String(code).padStart(6, '0');
    };

}