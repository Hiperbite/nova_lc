import { v4 as uuid } from 'uuid';
import {
  Table,
  AllowNull,
  Column,
  DataType,
  BeforeCreate,
  Unique,
  BeforeUpdate,
  BeforeSave,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { Contact, Employee, Model } from "../";
//import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
// import Notify from "../app/Notify";
// import authRepo from "../repository/auth.repo";
@Table({
  timestamps: true,
  tableName: "Users",
})
export default class User extends Model {
  @Unique({ name: 'username', msg: 'username_should_be_unique' }) // add this line
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  salt?: string;;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  accessToken?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  passwordResetCode?: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  verificationCode?: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  verified?: boolean;

  @ForeignKey(() => Employee)
  employeeId?: string;

  @HasOne(() => Employee)
  employee?: Employee;

  //TODO: fix password compare
  passwordCompare = async (password: string) => {

    const myPassword = this.password ?? "";
    const verified = await bcrypt.compare(password, myPassword);

    return verified;
  }
  @BeforeSave
  @BeforeCreate
  static initVer = async (user: User) => {
    user.verificationCode = uuid().substring(5, 12).toUpperCase();
    user.verified = true;
  }

  @BeforeSave
  @BeforeCreate
  static validatePassword = async (user: User) => {
    const complexityOptions = {
      min: 6,
      max: 24,
      lowercase: true,
      uppercase: true,
    };
  };

  @BeforeUpdate
  @BeforeSave
  @BeforeCreate
  static hashPassword = async (user: User) => {

    if ((user.changed() || []).filter(x => x === 'password').length === 0)
      return;

    const saltRounds = 10;
    try {
      // Generate a salt
      user.salt = await bcrypt.genSalt(saltRounds);

      // Hash password
      user.password = await bcrypt.hash(user.password ?? "", user.salt);

      console.log(user.password);
    } catch (error) {
      console.log(error);
    }
  };


  static privateFields = [
    "password",
    "__v",
    "verificationCode",
    "passwordResetCode",
    "verified",
  ];
}
