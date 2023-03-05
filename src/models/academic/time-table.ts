import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import { Classy, Discipline, Model } from "../index";

@DefaultScope(() => ({
  include: [Discipline, Classy]
}))
@Scopes(() => ({
  full: {
    include: [Discipline],
  },
  yellow: {
    where: { primaryColor: 'yellow' },
  },
}))
@Table({
  timestamps: true,
  tableName: "TimeTables",
})
export default class TimeTable extends Model {
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
  weekDay?: number;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  start?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  duration?: number;

  @Column({
    type: DataType.TEXT,
  })
  descriptions?: string;

  @BelongsTo(() => Classy)
  classy?: Classy;

  @ForeignKey(() => Classy)
  classyId?: string;

  @BelongsTo(() => Discipline)
  discipline?: Discipline;

  @ForeignKey(() => Discipline)
  disciplineId?: string;

}
