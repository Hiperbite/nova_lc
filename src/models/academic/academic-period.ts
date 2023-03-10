import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany,
    AfterUpdate
  } from "sequelize-typescript";
  import { Classe, Model, Student, User } from "../index";
  
  @Table({
    timestamps: true,
    tableName: "Period",
  })
  export default class Period extends Model {
  
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

    @HasMany(()=>Classe)
    classes?: Classe[]
    

    @AfterUpdate
    static bf=(period:Period)=>{
      console.log('--------------------')
      const before=period.previous()
      const after=Object.keys(before).map((k)=>({[k]:period.dataValues[k]}));
    }
  }