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

import { Model , EventType} from "../index";

import SequenceApp, { CODES } from "../../application/common/sequence.app";

@Scopes(() => ({
    default: {
        include: []
    }
}))
@Table({
    timestamps: true,
    tableName: "Events",
})
export default class Event extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    descriptions?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    starte!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    end!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    privacity?: number;

    @BelongsTo(() => EventType)
    type!: EventType

    @ForeignKey(() => EventType)
    typeId!: string;

    @BeforeCreate
    @BeforeSave
    static initModel = async (event: Event) => {

        let code = await SequenceApp.count(CODES.EVENT);
        event.code = 'EVT' + String(code).padStart(8, '0');

    };
}