import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
    DefaultScope,
    HasMany,
    Scopes
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import sendEmail, { mailServices } from "../../application/mailler/index";
import { Assessment, Classe, ClasseRoom, Course, Model, Period, Person, Student, User } from "../index";

@DefaultScope(() => ({
    // include: [Student, Classe]
}))
@Scopes(() => ({
    withClassAndAssessment: {
        include: [Assessment, Classe]
    },
    full: {
        include: [
            Assessment, { model: Classe, include: [Course, Period, ClasseRoom] }]
    },
    students: {
        include: [Classe,
            { model: Student, include: [{ model: Person, include: [{ model: User, as: 'user' }] }] }]
    }
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

    @HasMany(() => Assessment)
    assessments?: Assessment[]

    @Column({
        type: DataType.VIRTUAL
    })
    get assessmentAverage() {

        for (let ass in this.assessments) {

        }
        const average = this.assessments?.reduce(function (o, a: Assessment) {
            o[a?.disciplineId] = o[a.disciplineId] || [];
            o[a.disciplineId].push(a);
            return o;
        }, Object.create(null));

        return average;
    }


    @BeforeCreate
    @BeforeSave
    static initModel = async (enrollment: Enrollment) => {
        await Enrollment.update({ current: false }, { where: { studentId: enrollment.studentId } })
        enrollment.current = true;

        const student = await Student.findByPk(enrollment.studentId, { include: [Person] });
        if (student?.code === null) {

            let code = await SequenceApp.count(CODES.ENROLLMENT);
            student.code = String(code).padStart(6, '0');
            student.save();

            sendEmail(
                {
                    service: mailServices.createEnrollment,
                    data: { person: student?.person, student: student, to: student?.person?.user?.email }
                })
        }
    };
}