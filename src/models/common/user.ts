import { v4 as uuid } from "uuid";
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
import { Contact, Person, Model } from "../";
//import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
import sendEmail from "../../application/mailler";
// import Notify from "../app/Notify";
// import authRepo from "../repository/auth.repo";
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
  static initVer = async (user: User) => {
    user.verificationCode = uuid().substring(5, 12).toUpperCase();
    user.verified = true;
  };

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

  @BeforeCreate
  static sendMail = async (user: User) =>
    await sendEmail({
      to: user.email,
      from: "test@example.com",
      subject: "Verify your email",
      text: `verification code: ${user.verificationCode}. Id: ${user.id}`,
    });

  @BeforeUpdate
  @BeforeSave
  @BeforeCreate
  static hashPassword = async (user: User) => {
    if ((user.changed() || []).filter((x) => x === "password").length === 0)
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
