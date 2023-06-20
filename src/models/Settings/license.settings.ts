import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "LicenseSettings",
})
export default class LicenseSetting extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  key!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type!: string;

}