import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "Settings",
})
export default class Setting {

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  classDuration: number = 6;

}