import {
  Table,
  Column,
  DataType,
  Scopes,
  HasMany,
  createIndexDecorator,
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
  tableName: "TicketTypes",
})
export default class TicketType extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptions?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  type?: string;
  
//  @UniqIndex
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  code?: string;

  @HasMany(() => Ticket)
  tickets?: Ticket[];
}

