import {
    Table,
    AllowNull,
    Column,
    DataType,
    BeforeCreate,
    BeforeSave,
    HasMany,
    BelongsToMany,
    Scopes
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Course, CurricularPlan, Model, PlanItem, Staff, StaffDiscipline, TimeTable } from "../index";

import { v4 as uuidv4 } from "uuid";

@Scopes(() => ({
    default: {
        include: [Staff, { model: PlanItem, include: [{ model: CurricularPlan, include: [Course] }] }]
    }
}))
@Table({
    timestamps: true,
    tableName: "Disciplines",
})
export default class Discipline extends Model {

    @Column({
        type: DataType.STRING,
    })
    code?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name?: string;

    @Column({
        type: DataType.TEXT,
    })
    descriptions?: string

    @BelongsToMany(() => Staff, () => StaffDiscipline)
    staffs?: Staff[];

    @HasMany(() => PlanItem)
    items?: PlanItem[]

    @HasMany(() => TimeTable)
    timeTables?: TimeTable[]

    @BeforeCreate
    @BeforeSave
    static initModel = async (student: Discipline) => {
        let code = await SequenceApp.count(CODES.DISCIPLINE);
        student.code = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(2, '0');
    };
}