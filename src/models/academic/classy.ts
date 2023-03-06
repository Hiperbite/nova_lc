import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import { AcademicPeriod, AcademicShift, ClassyRoom, Model, EnrollmentConfirmation, Student, User, Course, Semester, TimeTable } from "../index";

@Table({
    timestamps: true,
    tableName: "Classys",
})
export default class Classy extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    semester?: number;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @Column({
        type: DataType.VIRTUAL,
    })
    get activesEnrollments() {
        return this.enrollmentConfirmations
            ?.filter((e: any) => e.current && e.isActive)
    }

    @BelongsTo(() => ClassyRoom)
    classyRoom?: ClassyRoom;

    @ForeignKey(() => ClassyRoom)
    classyRoomId?: string;

    @HasMany(() => EnrollmentConfirmation)
    enrollmentConfirmations?: EnrollmentConfirmation[]

    @HasMany(() => TimeTable)
    timeTables?: TimeTable[]

    @BelongsTo(() => AcademicPeriod)
    academicPeriod?: AcademicPeriod

    @ForeignKey(() => AcademicPeriod)
    academicPeriodId?: AcademicPeriod

    @BelongsTo(() => AcademicShift)
    academicShift?: AcademicShift

    @ForeignKey(() => AcademicShift)
    academicShiftId?: AcademicShift

    @BelongsTo(() => Course)
    course?: Course;

    @ForeignKey(() => Course)
    courseId?: string;

    @BelongsTo(() => Semester)
    semestre?: Semester;

    @ForeignKey(() => Semester)
    semestreId?: string;

}