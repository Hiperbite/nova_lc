import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    Scopes,
  } from "sequelize-typescript";
  
  import {  Model, Person } from "../index";
  

@Scopes(() => ({
  default: {
      include: []
  }
}))
  @Table({
    timestamps: true,
    tableName: "Contacts",
  })
  export default class Contact extends Model  {
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    descriptions?: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    type?: string;
  
    @ForeignKey(() => Person)
    personId?: string;

    @BelongsTo(() => Person)
    person?: Person;
  }

  