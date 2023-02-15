
import {
    Model as Main,
    Column,
    DataType,
    BeforeCreate,
    BeforeUpdate,
  } from "sequelize-typescript";
  
  import { v4 as uuidv4 } from "uuid";
  
  export default class Model extends Main {
   
    @Column({
      type: DataType.UUID,
      primaryKey: true,
    })
    id?: string;
  
    @Column({
      type: DataType.BOOLEAN,
    })
    isActive!: boolean;
  
    @BeforeCreate
    static prepare = (model: Model) => {
      model.id = uuidv4();
      model.isActive = false;
    };
  
    @BeforeUpdate
    static prepareUpdate = (model: Model) => {
      model.id ||= uuidv4();
      model.isActive ||= true;
    };
  }