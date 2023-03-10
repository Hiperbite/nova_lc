import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
  } from "sequelize-typescript";
  import { Classe, Model, Student, User } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "ClasseRooms",
  })
  export default class ClasseRoom extends Model {
  
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

    @Column({
      type: DataType.INTEGER,
    })
    size?:number

    @HasMany(()=>Classe)
    classes?: Classe[]
    
  }