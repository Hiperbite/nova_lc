import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    DefaultScope
} from "sequelize-typescript";
import { Period, ClasseRoom, Model, Course, TimeTable, Enrollment } from "../index";

@DefaultScope(()=>({
    //include: [Enrollment]
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
        return this.enrollments?.filter((x:any)=>x.current)
    }
    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

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