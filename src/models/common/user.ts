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
  Index,
  AfterCreate,
  AfterSave,
  AfterUpdate,
  BelongsTo,
  createIndexDecorator,
} from "sequelize-typescript";
import { Person, Model } from "../";

import bcrypt from "bcrypt";
import { UserApp } from "../../application/common/user.app";
import sendEmail, { mailServices } from "../../application/mailler/index";
const EmailIndex = createIndexDecorator({
  // index options
  name: 'email-index',
  type: 'UNIQUE',
  unique: true,
});
@Table({
  timestamps: true,
  tableName: "Users",
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @EmailIndex
  @Column({
    type: DataType.STRING,
    allowNull: true
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
    type: DataType.TEXT,
    allowNull: true,
  })
  avatar?: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  verified?: boolean;

  @ForeignKey(() => Person)
  personId?: string;

  @BelongsTo(() => Person)
  person?: Person|any;

  @BeforeSave
  @BeforeCreate
  static initVer = UserApp.initVer;

  @BeforeCreate
  static sendMail = UserApp.sendMail;

  @BeforeSave
  static hashPassword = UserApp.hashPassword;

  //TODO: fix password compare
  passwordCompare = async (password: string) => {
    const myPassword = this.password ?? "";
    const verified = await bcrypt.compare(password, myPassword);

    return verified;
  };

  @AfterUpdate
  @AfterCreate
  @AfterSave
  static async refreshPersons(user: User) {
    const person = await Person.findByPk(user.personId);

    if (person && person.userId === null) {
      person.userId = user.id;
      person?.save();
    } else {
      if (person) user.person = person;
    }
 
    await sendEmail({
      service: mailServices["createUser"],
      data: user,
    });
  }
  
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
