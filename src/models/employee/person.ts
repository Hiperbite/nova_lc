
import {
  Table,

  Column,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Address, Contact, Document, Model } from "../index";
//import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
import { MaritalstatusType } from './employee';
// import Notify from "../app/Notify";
// import authRepo from "../repository/auth.repo";
@Table({
  timestamps: true,
  tableName: "Persons",
})
export default class Person extends Model {
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
        type: DataType.STRING,
        allowNull: false,
      })
      nationality!: string;
    
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
    
      @HasMany(() => Contact)
      contacts!: Contact[];
    
      @HasMany(() => Address)
      address?: Address[];
    
      @HasMany(() => Document)
      documents?: Document[];
  };

