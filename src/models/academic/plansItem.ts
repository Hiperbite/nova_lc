import {
  Table,
  AllowNull,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import { Course, CurricularPlan, Discipline, Model, Semester, Staff } from "../index";

@DefaultScope(() => ({
  //include: [Discipline, Staff]
}))
@Scopes(() => ({
  full: {
    include: [Discipline],
  },
  default: {
    include: [Discipline, Staff, { model: CurricularPlan, include: [Course] }]
  },
  yellow: {
    where: { primaryColor: 'yellow' },
  },
}))
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
  semester!: number;

  @Column({
    type: DataType.VIRTUAL,
  })
  get grade() {
    return Number(String(((this.semester ?? 1) / 2) + 0.5).split('.')[0])
  }
  
  @Column({
    type: DataType.TEXT,
  })
  descriptions?: string;

  @BelongsTo(() => CurricularPlan)
  curricularPlan!: CurricularPlan;

  @ForeignKey(() => CurricularPlan)
  curricularPlanId!: string;

  @BelongsTo(() => Discipline)
  discipline!: Discipline;

  @ForeignKey(() => Discipline)
  disciplineId!: string;

  @BelongsTo(() => Staff)
  professor?: Staff;

  @ForeignKey(() => Staff)
  professorId?: string;

}
