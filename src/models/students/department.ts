import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";
  
  import { Model } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "Departments",
  })
  export default class Department extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    name?: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    descriptions?: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    level?: string;
    
    @ForeignKey(() => Department)
    userId?: string;

    @BelongsTo(() => Department)
    department?: Department;

    @HasMany(() => Department)
    childs!: Department[];
  }