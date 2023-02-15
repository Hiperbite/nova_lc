import { Table, Column, DataType, BeforeCreate, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Model , User} from "../index";

@Table({
  timestamps: true,
  tableName: "Tokens",
})
export default class Token extends Model {

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  token?: string;

  @ForeignKey(() => User)
  userId?: string;
  @BelongsTo(() => User)
  user?: User;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  confirmed?: boolean;

  @BeforeCreate
  static createToken = async (token: Token) => {
   // token.token=authRepo.generateAccessToken(token.user?.email??"")
  }
}