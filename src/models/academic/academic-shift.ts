import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import { Classy, Model, Student, User } from "../index";

@Table({
    timestamps: true,
    tableName: "AcademicShifts",
})
export default class AcademicShift extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @Column({
        type: DataType.INTEGER,
    })
    duration?: number

    @Column({
        type: DataType.INTEGER,
    })
    year?: number

    @Column({
        type: DataType.DATE,
    })
    startDate?: Date

    @HasMany(() => Classy)
    classys?: Classy[]

}