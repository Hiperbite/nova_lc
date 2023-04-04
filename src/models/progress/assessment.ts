import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Scopes,
    DefaultScope,
} from "sequelize-typescript";

import { Classe, Discipline, Model, AssessmentType, Enrollment, Staff } from "../index";

@DefaultScope(() => ({
        include: [AssessmentType, Discipline]
    
}))
@Scopes(() => ({
    default: {
        include: []
    }
}))
@Table({
    timestamps: true,
    tableName: "Assessments",
})
export default class Assessment extends Model {
    @Column({
        type: DataType.DECIMAL(32,2),
        allowNull: false,
    })
    value!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    semester!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    descriptions?: string;

    @BelongsTo(() => Enrollment)
    enrollment?: Enrollment

    @ForeignKey(() => Enrollment)
    enrollmentId?: string

    @BelongsTo(() => Staff)
    staff?: Staff

    @ForeignKey(() => Staff)
    staffId?: string

    @BelongsTo(() => Classe)
    classe?: Classe

    @ForeignKey(() => Classe)
    classeId?: string

    @BelongsTo(() => Discipline)
    discipline?: Discipline

    @ForeignKey(() => Discipline)
    disciplineId!: string

    @BelongsTo(() => AssessmentType)
    type?: AssessmentType

    @ForeignKey(() => AssessmentType)
    typeId?: string
}