import {
  Table,
  Column,
  DataType,
  Scopes,
  HasMany
} from "sequelize-typescript";

import { Model, Ticket } from "../index";


@Scopes(() => ({
  default: {
    include: []
  }
}))
@Table({
  timestamps: true,
  tableName: "TicketStates",
})
export default class TicketState extends Model {
  static Opened = 'Opened'
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptions?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  code?: string;

  @HasMany(() => Ticket)
  tickets?: Ticket[];
}

