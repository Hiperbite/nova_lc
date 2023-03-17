import {
  Model as Main,
  Column,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  AfterUpdate,
  AfterSave,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  Scopes,
} from "sequelize-typescript";

import _ from "lodash";
import { v4 as uuids4 } from "uuid";
import { Track, User } from "./index";

@Scopes(() => ({
  default: {
      include: []
  }
}))
export default class Model extends Main {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id?: string

  @Column({
    type: DataType.BOOLEAN,
  })
  isActive!: boolean;

  @BelongsTo(() => User)
  updatedBy?: User;

  @ForeignKey(() => User)
  updatedById?: string;


  @BeforeCreate
  static prepare = (model: Model) => {
    model.isActive = true;
    model.id = model.id ?? uuids4();
  };

  @BeforeUpdate
  static prepareUpdate = (model: Model) => { };

  @AfterUpdate
  @AfterSave
  static afterModelUpdate = (model: Model) => {
    const before = model.previous();

    const obj = Object.keys(before).map((k) => ({ [k]: model.dataValues[k] }));
    const after = Object.assign({}, ...obj);
    Track.create({
      before,
      after,
      model: model.constructor.name,
      ref: model.id,
      userId: model.updatedById
    });
  };

  privateFields: string[] = [];
  dto = () => _.pick(this, this?.privateFields);
}
