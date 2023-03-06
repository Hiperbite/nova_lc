import {
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave
} from "sequelize-typescript";
import { Classy, Model, Enrollment, Student, User } from "../index";

@Table({
    timestamps: true,
    tableName: "EnrollmentConfirmations",
})
export default class EnrollmentConfirmation extends Model {

    @Column({
        type: DataType.STRING,
    })
    code?: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    current?: boolean;

    @Column({
        type: DataType.STRING,
    })
    descriptions?: string

    @BelongsTo(() => Enrollment)
    enrollment?: Enrollment;

    @ForeignKey(() => Enrollment)
    enrollmentId?: string;

    @BelongsTo(() => Classy)
    classy?: Classy;

    @ForeignKey(() => Classy)
    classyId?: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (confirmation: EnrollmentConfirmation) => {
        let code =
            confirmation.enrollment?.id?.substring(6, 12);

        confirmation.code =
            String(code).padStart(6, '0');

        confirmation.isActive =
            confirmation.current =
            true;

        const { enrollmentId } = confirmation;
        const enrollments =
            await
                EnrollmentConfirmation
                    .findAll({ where: { enrollmentId } })

        for (const enroll of enrollments) {
            enroll.current = false;
            enroll.save();
        }
    };

}