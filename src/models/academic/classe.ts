import { uniqBy } from "lodash";
import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    DefaultScope,
    Scopes
} from "sequelize-typescript";
import { Period, ClasseRoom, Model, Course, TimeTable, Enrollment, PlanItem, CurricularPlan, Discipline, Staff } from "../index";

@DefaultScope(() => ({
    //include: [Enrollment]
}))
@Scopes(() => ({
    full: {
        include: [Course, Period, ClasseRoom]
    },
    default: {
        include: [ClasseRoom,
            { model: Course, include: [{ model: CurricularPlan, include: [{ model: PlanItem, include: [Staff, Discipline] }] }] }, TimeTable, Period, Enrollment]
    }
}))
@Table({
    timestamps: true,
    tableName: "Classes",
})
export default class Classe extends Model {

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
        type: DataType.VIRTUAL,
    })
    get grade() {
        return Number(String(((this.semester ?? 1) / 2) + 0.5).split('.')[0])
    }

    @Column({
        type: DataType.VIRTUAL,
    })
    get activeEnrollments() {
        return this.enrollments?.filter((x: any) => x.current)
    }
    @Column({
        type: DataType.STRING,
    })
    descriptions?: string
    @Column({
        type: DataType.VIRTUAL,
    })
    get authorizations() {
        let auth: any[] = [];
        try {
            this.course?.curricularPlan?.items?.filter((item: PlanItem) => item?.semester === this.semester)
                .forEach(({ professor, discipline }: PlanItem) => auth.push({ discipline, professor }))

        } catch (err: any) { }
        return auth
    }

    @BelongsTo(() => ClasseRoom)
    classeRoom?: ClasseRoom;

    @ForeignKey(() => ClasseRoom)
    classeRoomId?: string;

    @HasMany(() => TimeTable)
    timeTables?: TimeTable[]

    @HasMany(() => Enrollment)
    enrollments?: Enrollment[]

    @BelongsTo(() => Period)
    period?: Period

    @ForeignKey(() => Period)
    periodId?: Period

    @BelongsTo(() => Course)
    course?: Course;

    @ForeignKey(() => Course)
    courseId?: string;

}