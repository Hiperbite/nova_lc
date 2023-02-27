import {
  Table,
  AllowNull,
  Column,
  DataType,
  BeforeCreate,
  Unique,
  BeforeUpdate,
  BeforeSave,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { Person, Model } from "../";

import bcrypt from "bcrypt";
import { UserApp } from "../../application/common/user.app";

@Table({
  timestamps: true,
  tableName: "Users",
})
export default class User extends Model {
  @Unique({ name: "username", msg: "username_should_be_unique" }) // add this line
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
  salt?: string;

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

  @ForeignKey(() => Person)
  personId?: string;

  @HasOne(() => Person)
  person?: Person;

  //TODO: fix password compare
  passwordCompare = async (password: string) => {
    const myPassword = this.password ?? "";
    const verified = await bcrypt.compare(password, myPassword);

    return verified;
  };

  @BeforeSave
  @BeforeCreate
  static initVer = UserApp.initVer;

  @BeforeCreate
  static sendMail = UserApp.sendMail;

  @BeforeUpdate
  @BeforeSave
  @BeforeCreate
  static hashPassword = UserApp.hashPassword;

  hashPassword = async (password: string) => {
    const saltRounds = 10;
    try {
      // Generate a salt
      this.salt = await bcrypt.genSalt(saltRounds);

      // Hash password
      this.password = await bcrypt.hash(password, this.salt);

      console.log(this.password);
    } catch (error) {
      console.log(error);
    }
  };
  privateFields: string[] = [
    "id",
    "username",
    "email",
    "role",
    "verified",
    "personId",
    "person",
  ];
}
