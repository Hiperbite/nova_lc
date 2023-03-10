import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
    DefaultScope
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Classe, Model, Student } from "../index";

@DefaultScope(() => ({
    // include: [Student, Classe]
}))
@Table({
    timestamps: true,
    tableName: "Enrollments",
})
export default class Enrollment extends Model {

    @Column({
        type: DataType.VIRTUAL,
    })
    get code() {
        return this?.id?.substring(6, 12)
    }

    @Column({
        type: DataType.BOOLEAN,
    })
    current?: boolean;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @BelongsTo(() => Student)
    student?: Student;

    @ForeignKey(() => Student)
    studentId!: string;

    @BelongsTo(() => Classe)
    classe?: Classe;

    @ForeignKey(() => Classe)
    classeId!: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (enrollment: Enrollment) => {
        await Enrollment.update({ current: false }, { where: { studentId: enrollment.studentId } })
        enrollment.current = true;

        const student = await Student.findByPk(enrollment.studentId);
        if (student?.code === null) {

            let code = await SequenceApp.count(CODES.ENROLLMENT);
            student.code = String(code).padStart(6, '0');
            student.save();
        }
    };
}