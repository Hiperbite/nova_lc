import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
  } from "sequelize-typescript";
  import { Classy, Model, Student, User } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "AcademicPeriod",
  })
  export default class AcademicPeriod extends Model {
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    code?: string;
  
    @Column({
      type: DataType.STRING,
    })
    descriptions?:string

    @HasMany(()=>Classy)
    classys?: Classy[]
    
  }