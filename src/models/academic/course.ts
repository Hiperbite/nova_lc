import {
    Table,
    AllowNull,
    Column,
    DataType,
    BeforeCreate,
    BeforeSave,
    BeforeUpdate,
    HasOne,
    ForeignKey,
    HasMany,
    DefaultScope,
    Scopes,
    AfterCreate,
    AfterSave,
    AfterUpdate,
    Unique,
    BelongsTo
} from "sequelize-typescript";
import SequenceApp, { CODES } from "../../application/common/sequence.app";
import { Classe, CurricularPlan, Model, Student } from "../index";

import { v4 as uuidv4 } from "uuid";

@Scopes(() => ({
    default: {
        include: [Classe, CurricularPlan]
    }
}))
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
    name!: string

    @Column({
        type: DataType.TEXT,
    })
    descriptions?: string

    @HasMany(() => Classe)
    classes?: Classe[]

    @HasOne(() => CurricularPlan)
    curricularPlan?: CurricularPlan;

    @ForeignKey(() => CurricularPlan)
    id?: string

    @BeforeCreate
    @BeforeSave
    @BeforeUpdate
    static initModel = async (course: Course) => {
        if (course.code) { } else {
            let code = await SequenceApp.count(CODES.COURSE);
            course.code = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(2, '0');
        }
    }

    @AfterCreate
    @AfterSave
    @AfterUpdate
    static initAfterSaveModel = async (course: Course) => {
        if (course.code) { } else {
            let code = await SequenceApp.count(CODES.COURSE);
            course.code = uuidv4().substring(5, 9).toUpperCase() + String(code).padStart(2, '0');
        }
        /*if (course.curricularPlans?.length === 0)
            try {
                await CurricularPlan.create({ id: course?.id });
            } catch (e) { }*/
        // course.update({ curricularPlanId: curricularPlan?.id })

    };
}