import {
    Table,
    AllowNull,
    Column,
    DataType,
    BeforeCreate,
    BeforeSave
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Model } from "../index";

import { v4 as uuidv4 } from "uuid";

@Table({
    timestamps: true,
    tableName: "Courses",
})
export default class Course extends Model {

    @Column({
        type: DataType.STRING,
    })
    code?: string;

    @Column({
        type: DataType.STRING,
    })
    name?: string

    @Column({
        type: DataType.TEXT,
    })
    descriptions?: string

    @BeforeCreate
    @BeforeSave
    static initModel = async (course: Course) => {
      let code = await SequenceApp.count(CODES.COURSE);
      course.code = uuidv4().substring(5, 9).toUpperCase()+String(code).padStart(2, '0');
    };
}