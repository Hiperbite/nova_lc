
import { ForeignKey, Table } from "sequelize-typescript";
import { Discipline, Model, Staff } from "../index";

@Table
export default class StaffDiscipline extends Model {
  @ForeignKey(() => Staff)
  staffId?: string;

  @ForeignKey(() => Discipline)
  diciplineId?: string;
}