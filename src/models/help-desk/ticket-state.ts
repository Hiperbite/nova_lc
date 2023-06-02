import {
  Table,
  Column,
  DataType,
  Scopes,
  HasMany,
  createIndexDecorator
} from "sequelize-typescript";

import { Model, Ticket } from "../index";
import { v4 as uuid } from "uuid";

const UniqIndex = createIndexDecorator({
  name: uuid()+'-index',
  type: 'UNIQUE',
  unique: true,
});

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

  //@UniqIndex
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  code!: string;

  @HasMany(() => Ticket)
  tickets?: Ticket[];
}

