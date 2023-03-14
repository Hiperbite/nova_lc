import {
    Table,
    Column,
    DataType,
    Scopes,
    DefaultScope
} from "sequelize-typescript";

import { Model } from "../index";

@DefaultScope(() => ({
    order: [["no", "DESC"]],
}))
@Scopes(() => ({
    default: {
        include: [],
        order: [["no", "ASC"]],
    }
}))
@Table({
    timestamps: true,
    tableName: "AssessmentTypes",
})
export default class AssessmentType extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    no!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    descriptions?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    value?: string;

}