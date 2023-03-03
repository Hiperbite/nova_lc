import {
    Table,
    AllowNull,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    HasMany
} from "sequelize-typescript";
import { AcademicPeriod, AcademicShift, ClassyRoom, Model, EnrollmentConfirmation, Student, User } from "../index";

@Table({
    timestamps: true,
    tableName: "Classys",
})
export default class Classy extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    grade?: number;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @BelongsTo(() => ClassyRoom)
    classyRoom?: ClassyRoom;

    @ForeignKey(() => ClassyRoom)
    classyRoomId?: string; 

    @HasMany(() => EnrollmentConfirmation)
    enrollmentConfirmations?: EnrollmentConfirmation[]
    
    @BelongsTo(() => AcademicPeriod)
    academicPeriod?: AcademicPeriod

    @ForeignKey(() => AcademicPeriod)
    academicPeriodId?: AcademicPeriod
    
    @BelongsTo(() => AcademicShift)
    academicShift?: AcademicShift

    @ForeignKey(() => AcademicShift)
    academicShiftId?: AcademicShift

}