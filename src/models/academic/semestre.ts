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