import {
  Model as Main,
  Column,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  AfterUpdate,
  AfterSave,
} from "sequelize-typescript";

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Track } from "./index";

export default class Model extends Main {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id?: string = uuidv4();

  @Column({
    type: DataType.BOOLEAN,
  })
  isActive!: boolean;

  @BeforeCreate
  static prepare = (model: Model) => {
    model.isActive = false;
  };

  @BeforeUpdate
  static prepareUpdate = (model: Model) => {};

  @AfterUpdate
  //@AfterSave
  static afterModelUpdate = (model: Model) => {
    const before = model.previous();
    const obj = Object.keys(before).map((k) => ({ [k]: model.dataValues[k] }));
    const after = Object.assign({}, ...obj);
    Track.create({
      before,
      after,
      model: model.constructor.name,
      ref: model.id,
    });
  };

  privateFields: string[] = [];
  dto = () => _.pick(this, this?.privateFields);
}
