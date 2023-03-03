import {
    Table,
    Column,
    DataType,
} from "sequelize-typescript";
import { Model } from "../index";

@Table({
    timestamps: true,
    tableName: "Semesters",
})
export default class Semester extends Model {

    

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    no?: number;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string
}