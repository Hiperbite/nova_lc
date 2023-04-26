import {
    Table,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Scopes,
} from "sequelize-typescript";
import { Course, Discipline, Model, PlanItem, Staff } from "../index";

@Scopes(() => ({
    default: {
        include: [Course, { model: PlanItem, include: [Discipline, Staff] }]
    }
}))
@Table({
    timestamps: true,
    tableName: "CurricularPlans",
})
export default class CurricularPlan extends Model {

    @Column({
        type: DataType.VIRTUAL,
    })
    get code() {
        return this.getDataValue('id').substring(4, 10).toUpperCase()
    }

    @Column({
        type: DataType.TEXT,
    })
    descriptions?: string

    @HasOne(() => Course)
    course?: Course;

    @ForeignKey(() => Course)
    id?: string;

    @HasMany(() => PlanItem)
    items?: PlanItem[]

}