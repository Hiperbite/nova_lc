import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  
  import {   Model, Transaction } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "Payrolls",
  })
  export default class Payroll extends Model {
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    date?: Date;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    descriptions?: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    status?: string;

    @HasMany(() => Transaction)
    transactions?: Transaction;
  }