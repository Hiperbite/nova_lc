import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "LocalSettings",
})
export default class LocalSetting extends Model{

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  logo!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descriptions!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type!: string;

}