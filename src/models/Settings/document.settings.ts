import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "DocumentSettings",
})
export default class DocumentSetting extends Model{

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  header!: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  statementWithoutNote!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  statementWithNote!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  historic!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  studentCard!: string;
}