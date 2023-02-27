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
    

    @AfterUpdate
    static bf=(period:AcademicPeriod)=>{
      console.log('--------------------')
      const before=period.previous()
      const after=Object.keys(before).map((k)=>({[k]:period.dataValues[k]}));
      console.log('+++++++++++++++++++++')
      console.log(period)
      console.log('*************************')
    }
  }