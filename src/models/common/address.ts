import {
    Table,
    Column,
    DataType,
    Scopes,
} from "sequelize-typescript";

import { Model } from "../index";

@Scopes(() => ({
    default: {
        include: []
    }
}))
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

}