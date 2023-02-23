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
    descriptions?:string

    @Column({
      type: DataType.INTEGER,
    })
    size?:number

    @HasMany(()=>Classy)
    classys?: Classy[]
    
  }