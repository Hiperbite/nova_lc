import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
  } from "sequelize-typescript";
  import { Model, Student, User } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "ClassyRooms",
  })
  export default class ClassyRoom extends Model {
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    code?: string;
  
    @Column({
      type: DataType.STRING,
    })
    desciptions?:string

    @HasMany(()=>Classy)
    classys?: Classy[]
    
  }