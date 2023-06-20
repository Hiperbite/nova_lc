import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate } from "sequelize-typescript";
import Repository from "../../repository/repository";
import { Model, User } from "../index";
import ClasseSetting from "./classe.settings";
import DocumentSetting from "./document.settings";
import LicenseSetting from "./license.settings";
import LocalSetting from "./local.settings";
import SystemSetting from "./system.settings";

@Table({
  timestamps: true,
  tableName: "Settings",
})
export default class Setting extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  code!: string;

  @ForeignKey(() => SystemSetting)
  systemId?: string;
  @BelongsTo(() => SystemSetting)
  system!: SystemSetting;

  @ForeignKey(() => DocumentSetting)
  documentId?: string;
  @BelongsTo(() => DocumentSetting)
  documents!: DocumentSetting;

  @ForeignKey(() => LocalSetting)
  localId?: string;
  @BelongsTo(() => LocalSetting)
  local!: LocalSetting;

  @ForeignKey(() => ClasseSetting)
  classeId?: string;
  @BelongsTo(() => ClasseSetting)
  classe!: ClasseSetting;

  @ForeignKey(() => LicenseSetting)
  licenseId?: string;
  @BelongsTo(() => LicenseSetting)
  license!: LicenseSetting;

}