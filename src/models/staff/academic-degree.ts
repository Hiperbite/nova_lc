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
  tableName: "AcademicDegrees",
})
export default class AcademicDegree extends Model {

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

  

  static initModel = async (academicDegree: AcademicDegree) => {
  };
}
