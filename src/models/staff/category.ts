import {
  Table,
  Column,
  DataType,
  HasMany,
} from "sequelize-typescript";
import {
  Model,
  Staff,
} from "../index";


@Table({
  timestamps: true,
  tableName: "Categories",
})
export default class Category extends Model {

  @Column({
    type: DataType.STRING
  })
  code!: string

  @Column({
    type: DataType.STRING
  })
  name!: string

  @Column({
    type: DataType.INTEGER
  })
  no!: number

  @HasMany(() => Staff)
  staffs?: Staff[];

  static initModel = async (category: Category) => {
  };
}
