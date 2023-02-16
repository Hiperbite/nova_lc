import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  
  import {   Model, Transaction, TransactionType } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "Paypacks",
  })
  export default class Paypack extends Model {
    @Column({
      type: DataType.DECIMAL,
      allowNull: true,
    })
    value?: Number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    descriptions?: string;

    @ForeignKey(() => TransactionType)
    transactionTypeId?: string

    @BelongsTo(() => TransactionType)
    transactionsType?: TransactionType;
  }