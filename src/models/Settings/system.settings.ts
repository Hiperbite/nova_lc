import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "SystemSettings",
})
export default class SystemSetting extends Model {

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  duration: number = 6;

}