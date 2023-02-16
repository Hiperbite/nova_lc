import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    BelongsToMany,
    BeforeCreate,
    BeforeSave
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Model, Student, User } from "../index";

@Table({
    timestamps: true,
    tableName: "RegistrationConfirmations",
})
export default class RegistrationConfirmation extends Model {

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

    @BelongsTo(() => Registration)
    registration?: Registration;

    @ForeignKey(() => Registration)
    registrationId?: string;
    

}