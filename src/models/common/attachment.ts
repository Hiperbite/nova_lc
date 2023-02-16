import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey
  } from "sequelize-typescript";
  import { Model, User } from "../index";
  const TYPES = ['Default',
    'AVATAR',
    'SIM',
    'STNK',
    'KTP',
    'DIRI',
    'KENDARAAN',
    'KOTO',
    'BRAND'
  ]
  @Table({
    timestamps: true,
    tableName: "Attachments",
  })
  export default class Attachment extends Model {
  
    /**
     * 0 - Default,
     * 1 - AVATAR,
     * 2 - SIM,
     * 3 - STNK,
     * 4 - KTP,
     * 5 - DIRI,
     * 6 - KENDARAAN,
     * 7 - KOTO,
     * 8 - BRAND,
     * */
    @AllowNull(false)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    type?: number;
  
    @Column({
      type: DataType.VIRTUAL,
    })
    get typeDescriptio() {
      return TYPES[this.type ?? 0];
    }
    
  }