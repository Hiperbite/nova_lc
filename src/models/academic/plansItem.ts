import {
  Table,
  AllowNull,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { CurricularPlan, Discipline, Model, Semester } from "../index";

@Table({
  timestamps: true,
  tableName: "PlanItems",
})
export default class PlanItem extends Model {
  @Column({
    type: DataType.VIRTUAL,
  })
  get code() {
    return this.getDataValue("id").substring(4, 10).toUpperCase();
  }

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  grade?: number;

  @Column({
    type: DataType.TEXT,
  })
  descriptions?: string;

  @BelongsTo(() => CurricularPlan)
  curricularPlan?: CurricularPlan;

  @ForeignKey(() => CurricularPlan)
  curricularPlansId?: string;

  @BelongsTo(() => Discipline)
  discipline?: Discipline;

  @ForeignKey(() => Discipline)
  disciplineId?: string;

  @BelongsTo(() => Semester)
  semestre?: Semester;

  @ForeignKey(() => Semester)
  semestreId?: string;
}
