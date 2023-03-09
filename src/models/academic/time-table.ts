import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  DefaultScope,
  Scopes,
} from "sequelize-typescript";
import { Classe, Discipline, Model } from "../index";

@DefaultScope(() => ({
  include: [Discipline, Classe]
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
  weekDay!: number;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  startTime!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  duration?: number;

  @Column({
    type: DataType.TEXT,
  })
  descriptions?: string;

  @BelongsTo(() => Classe)
  classe?: Classe;

  @ForeignKey(() => Classe)
  classeId?: string;

  @BelongsTo(() => Discipline)
  discipline?: Discipline;

  @ForeignKey(() => Discipline)
  disciplineId?: string;

}
