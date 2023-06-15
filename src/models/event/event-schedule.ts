import {
    Table,
    Column,
    DataType,
    Scopes,
    BelongsTo,
    ForeignKey,
    BeforeCreate,
    BeforeSave,
} from "sequelize-typescript";

import { Model , EventType, Event} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

@Scopes(() => ({
    default: {
        include: []
    }
}))
@Table({
    timestamps: true,
    tableName: "EventSchedules",
})
export default class EventSchedule extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    code?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    descriptions?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    start!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    end!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    privacy?: number;

    @BelongsTo(() => Event)
    event!: Event

    @ForeignKey(() => Event)
    eventId!: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (schedule: EventSchedule) => {
        let code = await SequenceApp.count(CODES.SCHEDULE);
        schedule.code = 'SDL' + String(code).padStart(8, '0');

    };

}