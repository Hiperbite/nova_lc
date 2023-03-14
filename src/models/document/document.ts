import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Scopes,
} from "sequelize-typescript";

import { Attachment, Model, Person } from "../index";

type DocumenttypeType = "PASSPORT" | "IDCARD" | "OTHER";

@Scopes(() => ({
  default: {
      include: []
  }
}))
@Table({
  timestamps: true,
  tableName: "Documents",
})
export default class Document extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type?: DocumenttypeType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  issueDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  validationDate?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptions?: string;

  @ForeignKey(() => Attachment)
  attachmentId?: string;

  @BelongsTo(() => Attachment)
  attachment?: Attachment;

  @ForeignKey(() => Person)
  personId?: string;

  @BelongsTo(() => Person)
  person?: Person;
}

export { DocumenttypeType };
