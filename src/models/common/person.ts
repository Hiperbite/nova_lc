
import {
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  HasOne,
  AfterFind,
  DefaultScope,
} from "sequelize-typescript";
import { Address, Contact, Document, Model, User } from "../index";


export type MaritalstatusType =
  | "SINGLE"
  | "MARRIED"
  | "DIVORCED"
  | "WIDOWED"
  | "OTHER";
export type GenderType =
  | "M"
  | "F";


// import Notify from "../app/Notify";
// import authRepo from "../repository/auth.repo";
@DefaultScope(() => ({
  include: [
    //{ model: Address, as: 'birthPlaceAddress' },
  //  { model: Address, as: 'livingAddress' },
    { model: User, as: 'user' },
    
  ]
}))
@Table({
  timestamps: true,
  tableName: "Persons",
})
export default class Person extends Model {
  @Column({
    type: DataType.VIRTUAL,
  })
  get fullName() {
    return this.firstName + " " + (this.otherNames ?? '') + " " + this.lastName
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otherNames?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptions?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  maritalStatus?: MaritalstatusType;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  birthDate?: Date;


  @Column({
    type: DataType.VIRTUAL,
  })
  get yearsOld() {
    const _birthDate = new Date(this.birthDate ?? '')
    const currentDate = new Date()
    return Math.abs(currentDate.getUTCFullYear() - _birthDate.getUTCFullYear())
  }

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nationality!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender!: GenderType;

  @Column({
    type: DataType.VIRTUAL,
  })
  get idcard() {
    return (
      this.documents
        ?.sort((doc_a: Document, doc_b: Document) =>
          (doc_a?.validationDate ?? 0) > (doc_b?.validationDate ?? 0) ? 0 : 1
        )
        .filter((doc: Document) => doc.type == "IDCARD")[0] ?? {}
    );
  }

  @Column({
    type: DataType.VIRTUAL,
  })
  get passport() {
    return (
      this.documents
        ?.sort((doc_a: Document, doc_b: Document) =>
          (doc_a?.validationDate ?? 0) > (doc_b?.validationDate ?? 0) ? 0 : 1
        )
        .filter((doc: Document) => doc.type == "PASSPORT")[0] ?? {}
    );
  }

  @ForeignKey(() => Address)
  birthPlaceAddressId?: string;

  @BelongsTo(() => Address, { foreignKey: 'birthPlaceAddressId' })
  birthPlaceAddress?: Address

  @ForeignKey(() => Address)
  livingAddressId?: string;

  @BelongsTo(() => Address, { foreignKey: 'livingAddressId' })
  livingAddress?: Address

  @ForeignKey(() => User)
  userId?: string;

  @HasOne(() => User)
  user?: User

  @HasMany(() => Contact)
  contacts!: Contact[];

  @HasMany(() => Document)
  documents?: Document[];


  @AfterFind
  static afterFindPerson = () => {

  }

};

