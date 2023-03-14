import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    BeforeCreate,
    BeforeSave,
    HasOne,
    DefaultScope,
    Scopes,
    Unique
} from "sequelize-typescript";
import SequenceApp from "../../application/common/sequence.app";
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

    @BelongsTo(() => Course)
    course?: Course;

    @ForeignKey(() => Course)
    id?: string;

    @HasMany(() => PlanItem)
    items?: PlanItem[]
}