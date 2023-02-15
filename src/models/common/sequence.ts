import {
  Table,
  Column,
  DataType,
  BeforeCreate,
  Unique,
  ModelCtor 
} from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model, Sequence as Seq, User } from "../index";

@Table({
  timestamps: true,
  tableName: "Sequences",
})
export default class Sequence extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sequence?: number;
  @Unique({ name: "code", msg: "code_should_be_unique" }) // add this line
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code?: string;

  @BeforeCreate
  static createSequence = async (sequence: Sequence) => {
    sequence.sequence = 1;
  };
}
