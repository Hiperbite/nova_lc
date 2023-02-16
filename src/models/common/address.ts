import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { Model, Person, User } from "../index";

@Table({
    timestamps: true,
    tableName: "Address",
})
export default class Address extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    descriptions?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    city!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    province!: string;

    @ForeignKey(() => Person)
    personId?: string;

    @BelongsTo(() => Person)
    person?: Person;  
}