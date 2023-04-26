import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey, AfterUpdate, AfterCreate } from "sequelize-typescript";
import socketService from "../../service/socket.service";
import { Model, User } from "../index";

@Table({
  timestamps: true,
  tableName: "Notifications",
})
export default class Notification extends Model {

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  viewed?: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  text?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  model?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ref?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  userId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  get sendBy(): string[] {
    return "this.getDataValue('sendBy')".split('.')
  };
  set sendBy(sentBy: string[]) {
    this.setDataValue('sendBy', sentBy.join('_'))
  };

  @ForeignKey(() => User)
  userYd?: string;

  @BelongsTo(() => User)
  user?: User;

  @AfterCreate
  static createNotification = async (notification: Notification) => {
    socketService.emit(notification).to(notification.userId??'3d86a1b5-7868-4543-b4d4-8620b735b69a');
  }

}