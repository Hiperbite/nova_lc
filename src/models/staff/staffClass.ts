import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BeforeCreate,
  BeforeSave,
  HasOne,
  AfterCreate,
  AfterSave,
} from "sequelize-typescript";
import {
  Model,
  Staff,
  Classe,
  Discipline,
} from "../index";


@Table({
  timestamps: true,
  tableName: "staffClasses",
})
export default class StaffClasse extends Model {

  @ForeignKey(() => Staff)
  staffId?: string;

  @BelongsTo(() => Staff)
  staff?: Staff;

  @ForeignKey(() => Classe)
  classeId?: string;

  @BelongsTo(() => Classe)
  classe?: Classe;

  @ForeignKey(() => Discipline)
  disciplineId?: string;

  @BelongsTo(() => Discipline)
  discipline?: Discipline;

  @BeforeCreate
  @BeforeSave
  static initModel = async (staff: StaffClasse) => {
  };
}
