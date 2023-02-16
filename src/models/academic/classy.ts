import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import { Model, Student, User } from "../index";

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
        type: DataType.STRING,
    })
    desciptions?: string

    @BelongsTo(() => ClassyRoom)
    classyRoom?: ClassyRoom;

    @ForeignKey(() => ClassyRoom)
    classyRoomId?: string;;

    @HasMany(() => Student)
    students?: Student[]

}