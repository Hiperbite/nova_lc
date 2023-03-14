import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BeforeCreate,
  BeforeSave,
  Scopes,
  DefaultScope,
  BelongsToMany,
} from "sequelize-typescript";
import {
  Model,
  Role,
  Category,
  Department,
  Person,
  StaffClasse,
  Discipline,
  StaffDiscipline,
} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

@DefaultScope(() => ({
  include: [Person, Discipline]
}))
@Scopes(() => ({
  professor: {
    where: {

      [Op.and]: [
        { roles: { [Op.like]: `%PROFFESSOR%` } },
      ]
    }
  }
}))

@Table({
  timestamps: true,
  tableName: "Staffs",
})
export default class Staff extends Model {
  [x: string]: any;
  @Column({
    type: DataType.STRING,
    //     allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    //     allowNull: false,
  })
  get roles() {
    return (this.getDataValue('roles') ?? '').split(',')
  }
  set roles(roles: string[]) {
    this.setDataValue('roles', roles.join(','))
  }

  @ForeignKey(() => Person)
  personId?: string;

  @BelongsTo(() => Person)
  person?: Person;

  @ForeignKey(() => Category)
  categoryId?: string;

  @BelongsTo(() => Category)
  category?: Category;

  @ForeignKey(() => Department)
  departmentId?: string;

  @BelongsTo(() => Department)
  department?: Department;

  @HasMany(() => StaffClasse)
  classes?: StaffClasse[];

  @BelongsToMany(() => Discipline, () => StaffDiscipline)
  disciplines?: Discipline[];

  @BeforeCreate
  @BeforeSave
  static initModel = async (staff: Staff) => {
    let code = await SequenceApp.count(CODES.STAFF);
    staff.code = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(8, '0');
  };
}
